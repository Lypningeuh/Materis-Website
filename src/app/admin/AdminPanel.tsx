"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Users,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  LogOut,
  Loader2,
  FolderOpen,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { RessourceCategory, Ressource, Session, Praticien } from "@/lib/types";

type Tab = "ressources" | "sessions" | "praticiens" | "categories";

// Simple password protection (à remplacer par une vraie auth plus tard)
const ADMIN_PASSWORD = "materis2025";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("ressources");
  const [loading, setLoading] = useState(false);

  // Data states
  const [categories, setCategories] = useState<RessourceCategory[]>([]);
  const [ressources, setRessources] = useState<Ressource[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [praticiens, setPraticiens] = useState<Praticien[]>([]);

  // Edit states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("materis_admin", "true");
    } else {
      alert("Mot de passe incorrect");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("materis_admin") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    setLoading(true);

    const [catsRes, ressRes, sessRes, pratRes] = await Promise.all([
      supabase.from("ressource_categories").select("*").order("display_order"),
      supabase.from("ressources").select("*, category:ressource_categories(*)").order("display_order"),
      supabase.from("sessions").select("*").order("date_start"),
      supabase.from("praticiens").select("*").order("name"),
    ]);

    if (catsRes.data) setCategories(catsRes.data);
    if (ressRes.data) setRessources(ressRes.data);
    if (sessRes.data) setSessions(sessRes.data);
    if (pratRes.data) setPraticiens(pratRes.data);

    setLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("materis_admin");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-clair flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blanc p-8 rounded-2xl shadow-soft max-w-md w-full"
        >
          <h1 className="text-2xl font-serif text-noir mb-6 text-center">
            Administration MATERIS
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-noir mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore focus:ring-2 focus:ring-dore/20 outline-none"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-gradient text-blanc py-3 rounded-full font-medium"
            >
              Accéder
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: "ressources" as Tab, label: "Ressources", icon: BookOpen },
    { id: "categories" as Tab, label: "Catégories", icon: FolderOpen },
    { id: "sessions" as Tab, label: "Sessions", icon: Calendar },
    { id: "praticiens" as Tab, label: "Praticiens", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-clair">
      {/* Header */}
      <div className="bg-noir text-blanc py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-serif">Administration MATERIS</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm hover:text-dore transition-colors"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setEditingItem(null);
                setIsCreating(false);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-dore text-blanc"
                  : "bg-blanc text-noir-light hover:bg-beige/50"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="text-dore animate-spin" />
          </div>
        ) : (
          <>
            {activeTab === "ressources" && (
              <RessourcesTab
                ressources={ressources}
                categories={categories}
                onRefresh={fetchAllData}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
              />
            )}
            {activeTab === "categories" && (
              <CategoriesTab
                categories={categories}
                onRefresh={fetchAllData}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
              />
            )}
            {activeTab === "sessions" && (
              <SessionsTab
                sessions={sessions}
                onRefresh={fetchAllData}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
              />
            )}
            {activeTab === "praticiens" && (
              <PraticiensTab
                praticiens={praticiens}
                onRefresh={fetchAllData}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// RESSOURCES TAB
// ============================================
function RessourcesTab({
  ressources,
  categories,
  onRefresh,
  editingItem,
  setEditingItem,
  isCreating,
  setIsCreating,
}: {
  ressources: Ressource[];
  categories: RessourceCategory[];
  onRefresh: () => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
  isCreating: boolean;
  setIsCreating: (v: boolean) => void;
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category_id: "",
    sections_count: 0,
    lessons_count: 0,
    members_count: 0,
    external_url: "",
    is_published: true,
    display_order: 0,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setForm({
        title: editingItem.title || "",
        description: editingItem.description || "",
        category_id: editingItem.category_id || "",
        sections_count: editingItem.sections_count || 0,
        lessons_count: editingItem.lessons_count || 0,
        members_count: editingItem.members_count || 0,
        external_url: editingItem.external_url || "",
        is_published: editingItem.is_published ?? true,
        display_order: editingItem.display_order || 0,
      });
    } else if (isCreating) {
      setForm({
        title: "",
        description: "",
        category_id: categories[0]?.id || "",
        sections_count: 0,
        lessons_count: 0,
        members_count: 0,
        external_url: "",
        is_published: true,
        display_order: 0,
      });
    }
  }, [editingItem, isCreating, categories]);

  const handleSave = async () => {
    setSaving(true);
    const data = {
      ...form,
      category_id: form.category_id || null,
      updated_at: new Date().toISOString(),
    };

    if (editingItem) {
      await supabase.from("ressources").update(data).eq("id", editingItem.id);
    } else {
      await supabase.from("ressources").insert(data);
    }

    setSaving(false);
    setEditingItem(null);
    setIsCreating(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette ressource ?")) return;
    await supabase.from("ressources").delete().eq("id", id);
    onRefresh();
  };

  const handleTogglePublish = async (item: Ressource) => {
    await supabase
      .from("ressources")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);
    onRefresh();
  };

  if (editingItem || isCreating) {
    return (
      <div className="bg-blanc rounded-2xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif text-noir">
            {editingItem ? "Modifier la ressource" : "Nouvelle ressource"}
          </h2>
          <button
            onClick={() => {
              setEditingItem(null);
              setIsCreating(false);
            }}
            className="text-noir-light hover:text-noir"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-noir mb-2">Titre *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Catégorie</label>
            <select
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            >
              <option value="">Sans catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-noir mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Sections</label>
            <input
              type="number"
              value={form.sections_count}
              onChange={(e) => setForm({ ...form, sections_count: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Leçons</label>
            <input
              type="number"
              value={form.lessons_count}
              onChange={(e) => setForm({ ...form, lessons_count: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Membres</label>
            <input
              type="number"
              value={form.members_count}
              onChange={(e) => setForm({ ...form, members_count: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Ordre d&apos;affichage</label>
            <input
              type="number"
              value={form.display_order}
              onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-noir mb-2">URL externe</label>
            <input
              type="url"
              value={form.external_url}
              onChange={(e) => setForm({ ...form, external_url: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
              placeholder="https://..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                className="w-5 h-5 rounded border-beige text-dore focus:ring-dore"
              />
              <span className="text-sm font-medium text-noir">Publié</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => {
              setEditingItem(null);
              setIsCreating(false);
            }}
            className="px-6 py-2.5 text-noir-light hover:text-noir transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.title}
            className="flex items-center gap-2 px-6 py-2.5 btn-gradient text-blanc rounded-full disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Enregistrer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif text-noir">{ressources.length} ressource(s)</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-2.5 btn-gradient text-blanc rounded-full"
        >
          <Plus size={18} />
          Nouvelle ressource
        </button>
      </div>

      <div className="space-y-4">
        {ressources.map((item) => (
          <div
            key={item.id}
            className="bg-blanc rounded-xl p-5 shadow-soft flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-medium text-noir">{item.title}</h3>
                {!item.is_published && (
                  <span className="text-xs bg-beige text-noir-light px-2 py-1 rounded">
                    Brouillon
                  </span>
                )}
              </div>
              {item.category && (
                <p className="text-sm text-dore">{item.category.name}</p>
              )}
              <p className="text-xs text-noir-light mt-1">
                {item.sections_count} sections • {item.lessons_count} leçons • {item.members_count} membres
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleTogglePublish(item)}
                className="p-2 hover:bg-clair rounded-lg transition-colors"
                title={item.is_published ? "Dépublier" : "Publier"}
              >
                {item.is_published ? (
                  <Eye size={18} className="text-dore" />
                ) : (
                  <EyeOff size={18} className="text-noir-light" />
                )}
              </button>
              <button
                onClick={() => setEditingItem(item)}
                className="p-2 hover:bg-clair rounded-lg transition-colors"
              >
                <Pencil size={18} className="text-noir-light" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// CATEGORIES TAB
// ============================================
function CategoriesTab({
  categories,
  onRefresh,
  editingItem,
  setEditingItem,
  isCreating,
  setIsCreating,
}: {
  categories: RessourceCategory[];
  onRefresh: () => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
  isCreating: boolean;
  setIsCreating: (v: boolean) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "BookOpen",
    display_order: 0,
  });
  const [saving, setSaving] = useState(false);

  const icons = ["BookOpen", "Scale", "Compass", "Heart", "Target", "Flower2", "Hand"];

  useEffect(() => {
    if (editingItem) {
      setForm({
        name: editingItem.name || "",
        slug: editingItem.slug || "",
        description: editingItem.description || "",
        icon: editingItem.icon || "BookOpen",
        display_order: editingItem.display_order || 0,
      });
    } else if (isCreating) {
      setForm({
        name: "",
        slug: "",
        description: "",
        icon: "BookOpen",
        display_order: categories.length,
      });
    }
  }, [editingItem, isCreating, categories.length]);

  const handleSave = async () => {
    setSaving(true);
    const data = {
      ...form,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      updated_at: new Date().toISOString(),
    };

    if (editingItem) {
      await supabase.from("ressource_categories").update(data).eq("id", editingItem.id);
    } else {
      await supabase.from("ressource_categories").insert(data);
    }

    setSaving(false);
    setEditingItem(null);
    setIsCreating(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    await supabase.from("ressource_categories").delete().eq("id", id);
    onRefresh();
  };

  if (editingItem || isCreating) {
    return (
      <div className="bg-blanc rounded-2xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif text-noir">
            {editingItem ? "Modifier la catégorie" : "Nouvelle catégorie"}
          </h2>
          <button
            onClick={() => {
              setEditingItem(null);
              setIsCreating(false);
            }}
            className="text-noir-light hover:text-noir"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-noir mb-2">Nom *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
              placeholder="auto-généré si vide"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Icône</label>
            <select
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            >
              {icons.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Ordre</label>
            <input
              type="number"
              value={form.display_order}
              onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-noir mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => {
              setEditingItem(null);
              setIsCreating(false);
            }}
            className="px-6 py-2.5 text-noir-light hover:text-noir transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.name}
            className="flex items-center gap-2 px-6 py-2.5 btn-gradient text-blanc rounded-full disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Enregistrer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif text-noir">{categories.length} catégorie(s)</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-2.5 btn-gradient text-blanc rounded-full"
        >
          <Plus size={18} />
          Nouvelle catégorie
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((item) => (
          <div
            key={item.id}
            className="bg-blanc rounded-xl p-5 shadow-soft flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium text-noir">{item.name}</h3>
              <p className="text-sm text-noir-light">{item.slug} • Icône: {item.icon}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingItem(item)}
                className="p-2 hover:bg-clair rounded-lg transition-colors"
              >
                <Pencil size={18} className="text-noir-light" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// SESSIONS TAB
// ============================================
function SessionsTab({
  sessions,
  onRefresh,
  editingItem,
  setEditingItem,
  isCreating,
  setIsCreating,
}: {
  sessions: Session[];
  onRefresh: () => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
  isCreating: boolean;
  setIsCreating: (v: boolean) => void;
}) {
  const [form, setForm] = useState({
    title: "",
    date_start: "",
    date_end: "",
    location: "",
    instructor: "",
    price: "",
    places_total: "",
    places_remaining: "",
    description: "",
    is_published: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setForm({
        title: editingItem.title || "",
        date_start: editingItem.date_start || "",
        date_end: editingItem.date_end || "",
        location: editingItem.location || "",
        instructor: editingItem.instructor || "",
        price: editingItem.price?.toString() || "",
        places_total: editingItem.places_total?.toString() || "",
        places_remaining: editingItem.places_remaining?.toString() || "",
        description: editingItem.description || "",
        is_published: editingItem.is_published ?? true,
      });
    } else if (isCreating) {
      setForm({
        title: "",
        date_start: "",
        date_end: "",
        location: "",
        instructor: "Sandrine",
        price: "650",
        places_total: "12",
        places_remaining: "12",
        description: "",
        is_published: true,
      });
    }
  }, [editingItem, isCreating]);

  const handleSave = async () => {
    setSaving(true);
    const data = {
      title: form.title,
      date_start: form.date_start,
      date_end: form.date_end || null,
      location: form.location || null,
      instructor: form.instructor || null,
      price: form.price ? parseFloat(form.price) : null,
      places_total: form.places_total ? parseInt(form.places_total) : null,
      places_remaining: form.places_remaining ? parseInt(form.places_remaining) : null,
      description: form.description || null,
      is_published: form.is_published,
      updated_at: new Date().toISOString(),
    };

    if (editingItem) {
      await supabase.from("sessions").update(data).eq("id", editingItem.id);
    } else {
      await supabase.from("sessions").insert(data);
    }

    setSaving(false);
    setEditingItem(null);
    setIsCreating(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette session ?")) return;
    await supabase.from("sessions").delete().eq("id", id);
    onRefresh();
  };

  if (editingItem || isCreating) {
    return (
      <div className="bg-blanc rounded-2xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif text-noir">
            {editingItem ? "Modifier la session" : "Nouvelle session"}
          </h2>
          <button
            onClick={() => {
              setEditingItem(null);
              setIsCreating(false);
            }}
            className="text-noir-light hover:text-noir"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-noir mb-2">Titre *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Date début *</label>
            <input
              type="date"
              value={form.date_start}
              onChange={(e) => setForm({ ...form, date_start: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Date fin</label>
            <input
              type="date"
              value={form.date_end}
              onChange={(e) => setForm({ ...form, date_end: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Lieu</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Formateur</label>
            <input
              type="text"
              value={form.instructor}
              onChange={(e) => setForm({ ...form, instructor: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Prix (€)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Places totales</label>
            <input
              type="number"
              value={form.places_total}
              onChange={(e) => setForm({ ...form, places_total: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Places restantes</label>
            <input
              type="number"
              value={form.places_remaining}
              onChange={(e) => setForm({ ...form, places_remaining: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-noir mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                className="w-5 h-5 rounded border-beige text-dore focus:ring-dore"
              />
              <span className="text-sm font-medium text-noir">Publié</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => {
              setEditingItem(null);
              setIsCreating(false);
            }}
            className="px-6 py-2.5 text-noir-light hover:text-noir transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.title || !form.date_start}
            className="flex items-center gap-2 px-6 py-2.5 btn-gradient text-blanc rounded-full disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Enregistrer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif text-noir">{sessions.length} session(s)</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-2.5 btn-gradient text-blanc rounded-full"
        >
          <Plus size={18} />
          Nouvelle session
        </button>
      </div>

      <div className="space-y-4">
        {sessions.map((item) => (
          <div
            key={item.id}
            className="bg-blanc rounded-xl p-5 shadow-soft flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-medium text-noir">{item.title}</h3>
                {!item.is_published && (
                  <span className="text-xs bg-beige text-noir-light px-2 py-1 rounded">
                    Masqué
                  </span>
                )}
              </div>
              <p className="text-sm text-noir-light">
                {new Date(item.date_start).toLocaleDateString("fr-FR")}
                {item.date_end && ` - ${new Date(item.date_end).toLocaleDateString("fr-FR")}`}
                {item.location && ` • ${item.location}`}
              </p>
              <p className="text-xs text-dore mt-1">
                {item.price}€ • {item.places_remaining}/{item.places_total} places
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingItem(item)}
                className="p-2 hover:bg-clair rounded-lg transition-colors"
              >
                <Pencil size={18} className="text-noir-light" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// PRATICIENS TAB
// ============================================
function PraticiensTab({
  praticiens,
  onRefresh,
  editingItem,
  setEditingItem,
  isCreating,
  setIsCreating,
}: {
  praticiens: Praticien[];
  onRefresh: () => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
  isCreating: boolean;
  setIsCreating: (v: boolean) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    city: "",
    department: "",
    phone: "",
    email: "",
    website: "",
    formation_year: "",
    is_published: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setForm({
        name: editingItem.name || "",
        specialty: editingItem.specialty || "",
        city: editingItem.city || "",
        department: editingItem.department || "",
        phone: editingItem.phone || "",
        email: editingItem.email || "",
        website: editingItem.website || "",
        formation_year: editingItem.formation_year?.toString() || "",
        is_published: editingItem.is_published ?? true,
      });
    } else if (isCreating) {
      setForm({
        name: "",
        specialty: "Ostéopathe D.O.",
        city: "",
        department: "",
        phone: "",
        email: "",
        website: "",
        formation_year: new Date().getFullYear().toString(),
        is_published: true,
      });
    }
  }, [editingItem, isCreating]);

  const handleSave = async () => {
    setSaving(true);
    const data = {
      name: form.name,
      specialty: form.specialty || null,
      city: form.city || null,
      department: form.department || null,
      phone: form.phone || null,
      email: form.email || null,
      website: form.website || null,
      formation_year: form.formation_year ? parseInt(form.formation_year) : null,
      is_published: form.is_published,
      updated_at: new Date().toISOString(),
    };

    if (editingItem) {
      await supabase.from("praticiens").update(data).eq("id", editingItem.id);
    } else {
      await supabase.from("praticiens").insert(data);
    }

    setSaving(false);
    setEditingItem(null);
    setIsCreating(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce praticien ?")) return;
    await supabase.from("praticiens").delete().eq("id", id);
    onRefresh();
  };

  if (editingItem || isCreating) {
    return (
      <div className="bg-blanc rounded-2xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif text-noir">
            {editingItem ? "Modifier le praticien" : "Nouveau praticien"}
          </h2>
          <button
            onClick={() => {
              setEditingItem(null);
              setIsCreating(false);
            }}
            className="text-noir-light hover:text-noir"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-noir mb-2">Nom *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Spécialité</label>
            <input
              type="text"
              value={form.specialty}
              onChange={(e) => setForm({ ...form, specialty: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Ville</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Département</label>
            <input
              type="text"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
              placeholder="ex: 75"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Téléphone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Site web</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Année formation</label>
            <input
              type="number"
              value={form.formation_year}
              onChange={(e) => setForm({ ...form, formation_year: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                className="w-5 h-5 rounded border-beige text-dore focus:ring-dore"
              />
              <span className="text-sm font-medium text-noir">Visible sur le site</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => {
              setEditingItem(null);
              setIsCreating(false);
            }}
            className="px-6 py-2.5 text-noir-light hover:text-noir transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.name}
            className="flex items-center gap-2 px-6 py-2.5 btn-gradient text-blanc rounded-full disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Enregistrer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif text-noir">{praticiens.length} praticien(s)</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-2.5 btn-gradient text-blanc rounded-full"
        >
          <Plus size={18} />
          Nouveau praticien
        </button>
      </div>

      <div className="space-y-4">
        {praticiens.map((item) => (
          <div
            key={item.id}
            className="bg-blanc rounded-xl p-5 shadow-soft flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-medium text-noir">{item.name}</h3>
                {!item.is_published && (
                  <span className="text-xs bg-beige text-noir-light px-2 py-1 rounded">
                    Masqué
                  </span>
                )}
              </div>
              <p className="text-sm text-noir-light">
                {item.specialty}
                {item.city && ` • ${item.city}`}
                {item.department && ` (${item.department})`}
              </p>
              {item.formation_year && (
                <p className="text-xs text-dore mt-1">Formé(e) en {item.formation_year}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditingItem(item)}
                className="p-2 hover:bg-clair rounded-lg transition-colors"
              >
                <Pencil size={18} className="text-noir-light" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

