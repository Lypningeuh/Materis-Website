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
  FileText,
  PlayCircle,
  Video,
  Settings,
  MessageSquare,
  Mail,
  Gift,
  Check,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { RessourceCategory, Ressource, Session, Praticien, FormationExample, SiteSetting, ContactSubmission, LeadSubmission, EmailTemplateSettings } from "@/lib/types";

type Tab = "ressources" | "sessions" | "praticiens" | "categories" | "exemples" | "messages" | "leads" | "email" | "settings";

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
  const [formationExamples, setFormationExamples] = useState<FormationExample[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSetting[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [leadSubmissions, setLeadSubmissions] = useState<LeadSubmission[]>([]);

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

    const [catsRes, ressRes, sessRes, pratRes, examplesRes, settingsRes, messagesRes, leadsRes] = await Promise.all([
      supabase.from("ressource_categories").select("*").order("display_order"),
      supabase.from("ressources").select("*, category:ressource_categories(*)").order("display_order"),
      supabase.from("sessions").select("*").order("date_start"),
      supabase.from("praticiens").select("*").order("name"),
      supabase.from("formation_examples").select("*").order("display_order"),
      supabase.from("site_settings").select("*").order("key"),
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
      supabase.from("lead_submissions").select("*").order("created_at", { ascending: false }),
    ]);

    if (catsRes.data) setCategories(catsRes.data);
    if (ressRes.data) setRessources(ressRes.data);
    if (sessRes.data) setSessions(sessRes.data);
    if (pratRes.data) setPraticiens(pratRes.data);
    if (examplesRes.data) setFormationExamples(examplesRes.data);
    if (settingsRes.data) setSiteSettings(settingsRes.data);
    if (messagesRes.data) setContactSubmissions(messagesRes.data);
    if (leadsRes.data) setLeadSubmissions(leadsRes.data);

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

  const unreadMessages = contactSubmissions.filter(m => !m.is_read).length;

  const tabs = [
    { id: "ressources" as Tab, label: "Ressources", icon: BookOpen },
    { id: "categories" as Tab, label: "Catégories", icon: FolderOpen },
    { id: "sessions" as Tab, label: "Sessions", icon: Calendar },
    { id: "praticiens" as Tab, label: "Praticiens", icon: Users },
    { id: "exemples" as Tab, label: "Exemples Formation", icon: Video },
    { id: "messages" as Tab, label: `Messages${unreadMessages > 0 ? ` (${unreadMessages})` : ""}`, icon: MessageSquare },
    { id: "leads" as Tab, label: `Leads (${leadSubmissions.length})`, icon: Gift },
    { id: "email" as Tab, label: "Email Template", icon: Mail },
    { id: "settings" as Tab, label: "Paramètres", icon: Settings },
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
            {activeTab === "exemples" && (
              <FormationExamplesTab
                examples={formationExamples}
                onRefresh={fetchAllData}
                editingItem={editingItem}
                setEditingItem={setEditingItem}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
              />
            )}
            {activeTab === "messages" && (
              <ContactSubmissionsTab
                submissions={contactSubmissions}
                onRefresh={fetchAllData}
              />
            )}
            {activeTab === "leads" && (
              <LeadSubmissionsTab
                submissions={leadSubmissions}
                onRefresh={fetchAllData}
              />
            )}
            {activeTab === "email" && (
              <EmailTemplateTab
                settings={siteSettings}
                onRefresh={fetchAllData}
              />
            )}
            {activeTab === "settings" && (
              <SiteSettingsTab
                settings={siteSettings}
                onRefresh={fetchAllData}
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

// ============================================
// FORMATION EXAMPLES TAB
// ============================================
function FormationExamplesTab({
  examples,
  onRefresh,
  editingItem,
  setEditingItem,
  isCreating,
  setIsCreating,
}: {
  examples: FormationExample[];
  onRefresh: () => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
  isCreating: boolean;
  setIsCreating: (v: boolean) => void;
}) {
  const [form, setForm] = useState({
    type: "pdf" as "pdf" | "video",
    title: "",
    description: "",
    file_url: "",
    thumbnail_url: "",
    display_order: 0,
    is_published: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setForm({
        type: editingItem.type || "pdf",
        title: editingItem.title || "",
        description: editingItem.description || "",
        file_url: editingItem.file_url || "",
        thumbnail_url: editingItem.thumbnail_url || "",
        display_order: editingItem.display_order || 0,
        is_published: editingItem.is_published ?? true,
      });
    } else if (isCreating) {
      setForm({
        type: "pdf",
        title: "",
        description: "",
        file_url: "",
        thumbnail_url: "",
        display_order: examples.length,
        is_published: true,
      });
    }
  }, [editingItem, isCreating, examples.length]);

  const handleSave = async () => {
    setSaving(true);
    const data = {
      ...form,
      updated_at: new Date().toISOString(),
    };

    if (editingItem) {
      await supabase.from("formation_examples").update(data).eq("id", editingItem.id);
    } else {
      await supabase.from("formation_examples").insert(data);
    }

    setSaving(false);
    setEditingItem(null);
    setIsCreating(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet exemple ?")) return;
    await supabase.from("formation_examples").delete().eq("id", id);
    onRefresh();
  };

  const handleTogglePublish = async (item: FormationExample) => {
    await supabase
      .from("formation_examples")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);
    onRefresh();
  };

  // Edit/Create form view
  if (editingItem || isCreating) {
    return (
      <div className="bg-blanc rounded-2xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif text-noir">
            {editingItem ? "Modifier l'exemple" : "Nouvel exemple"}
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
            <label className="block text-sm font-medium text-noir mb-2">Type *</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as "pdf" | "video" })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            >
              <option value="pdf">PDF</option>
              <option value="video">Vidéo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">Titre *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-noir mb-2">URL du fichier *</label>
            <input
              type="url"
              value={form.file_url}
              onChange={(e) => setForm({ ...form, file_url: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
              placeholder="https://materis.schoolmaker.co/... ou https://youtube.com/..."
            />
            <p className="text-xs text-noir-light mt-1">
              Schoolmaker, YouTube, Google Drive, ou tout autre lien externe
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-noir mb-2">URL miniature (optionnel)</label>
            <input
              type="url"
              value={form.thumbnail_url}
              onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
              placeholder="https://..."
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
            disabled={saving || !form.title || !form.file_url}
            className="flex items-center gap-2 px-6 py-2.5 btn-gradient text-blanc rounded-full disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Enregistrer
          </button>
        </div>
      </div>
    );
  }

  // List view
  const pdfExamples = examples.filter(e => e.type === "pdf");
  const videoExamples = examples.filter(e => e.type === "video");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif text-noir">
          {examples.length} exemple(s) ({pdfExamples.length} PDF, {videoExamples.length} vidéos)
        </h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-2.5 btn-gradient text-blanc rounded-full"
        >
          <Plus size={18} />
          Nouvel exemple
        </button>
      </div>

      <div className="space-y-4">
        {examples.map((item) => (
          <div
            key={item.id}
            className="bg-blanc rounded-xl p-5 shadow-soft flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-dore/10 flex items-center justify-center">
                {item.type === "pdf" ? (
                  <FileText size={20} className="text-dore" />
                ) : (
                  <PlayCircle size={20} className="text-dore" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-noir">{item.title}</h3>
                  <span className="text-xs bg-dore/10 text-dore px-2 py-0.5 rounded uppercase">
                    {item.type}
                  </span>
                  {!item.is_published && (
                    <span className="text-xs bg-beige text-noir-light px-2 py-1 rounded">
                      Brouillon
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-sm text-noir-light line-clamp-1">{item.description}</p>
                )}
              </div>
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
// SITE SETTINGS TAB
// ============================================
function SiteSettingsTab({
  settings,
  onRefresh,
}: {
  settings: SiteSetting[];
  onRefresh: () => void;
}) {
  const [whatsappLink, setWhatsappLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [initializing, setInitializing] = useState(false);

  // Default WhatsApp link
  const DEFAULT_WHATSAPP = "https://wa.me/33631702848";

  useEffect(() => {
    const whatsappSetting = settings.find((s) => s.key === "whatsapp_link");
    setWhatsappLink(whatsappSetting?.value || DEFAULT_WHATSAPP);
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);

    const existingSetting = settings.find((s) => s.key === "whatsapp_link");

    if (existingSetting) {
      await supabase
        .from("site_settings")
        .update({
          value: whatsappLink,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingSetting.id);
    } else {
      await supabase.from("site_settings").insert({
        key: "whatsapp_link",
        value: whatsappLink,
        label: "Lien WhatsApp",
        description: "Lien WhatsApp affiché sur les pages Contact et Réseau",
      });
    }

    setSaving(false);
    onRefresh();
  };

  const handleInitialize = async () => {
    setInitializing(true);

    // Create default setting if table exists but is empty
    await supabase.from("site_settings").insert({
      key: "whatsapp_link",
      value: DEFAULT_WHATSAPP,
      label: "Lien WhatsApp",
      description: "Lien WhatsApp affiché sur les pages Contact et Réseau",
    });

    setInitializing(false);
    onRefresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif text-noir">Paramètres du site</h2>
      </div>

      <div className="bg-blanc rounded-2xl p-6 shadow-soft">
        <h3 className="text-lg font-medium text-noir mb-4">Liens de contact</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-noir mb-2">
              Lien WhatsApp
            </label>
            <input
              type="url"
              value={whatsappLink}
              onChange={(e) => setWhatsappLink(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
              placeholder="https://wa.me/33..."
            />
            <p className="text-xs text-noir-light mt-2">
              Ce lien sera utilisé sur les pages Contact et Réseau (le bouton WhatsApp du footer reste fixe).
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 btn-gradient text-blanc rounded-full disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Enregistrer
            </button>

            {settings.length === 0 && (
              <button
                onClick={handleInitialize}
                disabled={initializing}
                className="flex items-center gap-2 px-6 py-2.5 bg-beige text-noir rounded-full disabled:opacity-50"
              >
                {initializing ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                Initialiser les paramètres
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================
// CONTACT SUBMISSIONS TAB
// ============================================
function ContactSubmissionsTab({
  submissions,
  onRefresh,
}: {
  submissions: ContactSubmission[];
  onRefresh: () => void;
}) {
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);

  const handleMarkAsRead = async (id: string) => {
    await supabase
      .from("contact_submissions")
      .update({ is_read: true })
      .eq("id", id);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce message ?")) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    setSelectedMessage(null);
    onRefresh();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const profilLabels: Record<string, string> = {
    osteopathe: "Ostéopathe",
    "sage-femme": "Sage-femme",
    kine: "Kinésithérapeute",
    autre: "Autre",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif text-noir">
          {submissions.length} message(s)
        </h2>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-blanc rounded-2xl p-12 shadow-soft text-center">
          <Mail size={48} className="mx-auto text-beige mb-4" />
          <p className="text-noir-light">Aucun message pour le moment.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Liste des messages */}
          <div className="space-y-3">
            {submissions.map((msg) => (
              <button
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.is_read) handleMarkAsRead(msg.id);
                }}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  selectedMessage?.id === msg.id
                    ? "bg-dore/10 border-2 border-dore"
                    : "bg-blanc shadow-soft hover:shadow-lg border-2 border-transparent"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!msg.is_read && (
                        <span className="w-2 h-2 rounded-full bg-dore flex-shrink-0" />
                      )}
                      <span className="font-medium text-noir truncate">
                        {msg.name || "Anonyme"}
                      </span>
                      {msg.profil && (
                        <span className="text-xs bg-beige text-noir-light px-2 py-0.5 rounded">
                          {profilLabels[msg.profil] || msg.profil}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-noir-light line-clamp-2">{msg.message}</p>
                  </div>
                  <span className="text-xs text-noir-light/60 flex-shrink-0">
                    {formatDate(msg.created_at).split(" à ")[0]}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Détail du message */}
          <div className="bg-blanc rounded-2xl p-6 shadow-soft">
            {selectedMessage ? (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-medium text-noir text-lg">
                      {selectedMessage.name || "Anonyme"}
                    </h3>
                    {selectedMessage.email && (
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-dore hover:underline text-sm"
                      >
                        {selectedMessage.email}
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedMessage.profil && (
                    <div>
                      <p className="text-xs text-noir-light/60 uppercase tracking-wide mb-1">Profil</p>
                      <p className="text-noir">{profilLabels[selectedMessage.profil] || selectedMessage.profil}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-noir-light/60 uppercase tracking-wide mb-1">Message</p>
                    <p className="text-noir whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>

                  {selectedMessage.aide && (
                    <div>
                      <p className="text-xs text-noir-light/60 uppercase tracking-wide mb-1">Comment puis-je aider ?</p>
                      <p className="text-noir">{selectedMessage.aide}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-beige">
                    <p className="text-xs text-noir-light/60">
                      Reçu le {formatDate(selectedMessage.created_at)}
                    </p>
                  </div>
                </div>

                {selectedMessage.email && (
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: Votre message sur MATERIS`}
                    className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 btn-gradient text-blanc rounded-full"
                  >
                    <Mail size={18} />
                    Répondre par email
                  </a>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-noir-light">
                <p>Sélectionnez un message pour le lire</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// EMAIL TEMPLATE TAB
// ============================================
function EmailTemplateTab({
  settings,
  onRefresh,
}: {
  settings: SiteSetting[];
  onRefresh: () => void;
}) {
  const DEFAULT_TEMPLATE: EmailTemplateSettings = {
    subject: "{prenom}, voici vos 3 techniques !",
    intro_text: "Merci pour votre confiance. Comme promis, voici **3 techniques** que j'utilise quotidiennement avec mes patientes.",
    main_text: "Ces techniques sont simples, efficaces, et vos patientes vont adorer !",
    button_text: "Accéder aux 3 techniques",
    button_url: "https://materis.fr/ressources/3-techniques",
    features: [
      "Vidéo explicative pas à pas",
      "PDF récapitulatif téléchargeable",
      "Conseils d'application clinique"
    ],
    closing_text: "Si vous avez la moindre question, n'hésitez pas à me répondre directement à cet email.",
    signature_name: "Sandrine"
  };

  const [form, setForm] = useState<EmailTemplateSettings>(DEFAULT_TEMPLATE);
  const [saving, setSaving] = useState(false);
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    // Load settings from database
    const loadedSettings: Record<string, string> = {};
    settings
      .filter((s) => s.key.startsWith("email_template_"))
      .forEach((s) => {
        loadedSettings[s.key.replace("email_template_", "")] = s.value;
      });

    if (Object.keys(loadedSettings).length > 0) {
      setForm({
        subject: loadedSettings.subject || DEFAULT_TEMPLATE.subject,
        intro_text: loadedSettings.intro_text || DEFAULT_TEMPLATE.intro_text,
        main_text: loadedSettings.main_text || DEFAULT_TEMPLATE.main_text,
        button_text: loadedSettings.button_text || DEFAULT_TEMPLATE.button_text,
        button_url: loadedSettings.button_url || DEFAULT_TEMPLATE.button_url,
        features: loadedSettings.features ? JSON.parse(loadedSettings.features) : DEFAULT_TEMPLATE.features,
        closing_text: loadedSettings.closing_text || DEFAULT_TEMPLATE.closing_text,
        signature_name: loadedSettings.signature_name || DEFAULT_TEMPLATE.signature_name,
      });
    }
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);

    const templateFields = [
      { key: "email_template_subject", value: form.subject },
      { key: "email_template_intro_text", value: form.intro_text },
      { key: "email_template_main_text", value: form.main_text },
      { key: "email_template_button_text", value: form.button_text },
      { key: "email_template_button_url", value: form.button_url },
      { key: "email_template_features", value: JSON.stringify(form.features) },
      { key: "email_template_closing_text", value: form.closing_text },
      { key: "email_template_signature_name", value: form.signature_name },
    ];

    for (const field of templateFields) {
      const existingSetting = settings.find((s) => s.key === field.key);

      if (existingSetting) {
        await supabase
          .from("site_settings")
          .update({ value: field.value, updated_at: new Date().toISOString() })
          .eq("id", existingSetting.id);
      } else {
        await supabase.from("site_settings").insert({
          key: field.key,
          value: field.value,
          label: field.key.replace("email_template_", "").replace(/_/g, " "),
          description: "Email template setting",
        });
      }
    }

    setSaving(false);
    onRefresh();
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setForm({ ...form, features: [...form.features, newFeature.trim()] });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setForm({ ...form, features: form.features.filter((_, i) => i !== index) });
  };

  const handleReset = () => {
    if (confirm("Remettre les valeurs par défaut ?")) {
      setForm(DEFAULT_TEMPLATE);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif text-noir">Template Email - 3 Techniques</h2>
        <button
          onClick={handleReset}
          className="text-sm text-noir-light hover:text-noir"
        >
          Réinitialiser
        </button>
      </div>

      <div className="bg-blanc rounded-2xl p-6 shadow-soft space-y-6">
        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-noir mb-2">
            Objet de l&apos;email
          </label>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            placeholder="{prenom}, voici vos 3 techniques !"
          />
          <p className="text-xs text-noir-light mt-1">
            Utilisez {"{prenom}"} pour insérer le prénom du destinataire
          </p>
        </div>

        {/* Intro text */}
        <div>
          <label className="block text-sm font-medium text-noir mb-2">
            Texte d&apos;introduction
          </label>
          <textarea
            value={form.intro_text}
            onChange={(e) => setForm({ ...form, intro_text: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
          />
          <p className="text-xs text-noir-light mt-1">
            Utilisez **texte** pour mettre en gras (ex: **3 techniques**)
          </p>
        </div>

        {/* Main text */}
        <div>
          <label className="block text-sm font-medium text-noir mb-2">
            Texte principal
          </label>
          <textarea
            value={form.main_text}
            onChange={(e) => setForm({ ...form, main_text: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
          />
        </div>

        {/* Button */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-noir mb-2">
              Texte du bouton
            </label>
            <input
              type="text"
              value={form.button_text}
              onChange={(e) => setForm({ ...form, button_text: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-noir mb-2">
              URL du bouton
            </label>
            <input
              type="url"
              value={form.button_url}
              onChange={(e) => setForm({ ...form, button_url: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-noir mb-2">
            Liste &quot;Ce qui vous attend&quot;
          </label>
          <div className="space-y-2 mb-3">
            {form.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="flex-1 px-4 py-2 bg-clair rounded-lg text-noir">
                  {feature}
                </span>
                <button
                  onClick={() => removeFeature(index)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addFeature()}
              className="flex-1 px-4 py-2 rounded-lg border border-beige focus:border-dore outline-none"
              placeholder="Ajouter un élément..."
            />
            <button
              onClick={addFeature}
              className="px-4 py-2 bg-dore/10 text-dore rounded-lg hover:bg-dore/20 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Closing text */}
        <div>
          <label className="block text-sm font-medium text-noir mb-2">
            Texte de conclusion
          </label>
          <textarea
            value={form.closing_text}
            onChange={(e) => setForm({ ...form, closing_text: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
          />
        </div>

        {/* Signature */}
        <div>
          <label className="block text-sm font-medium text-noir mb-2">
            Signature (prénom)
          </label>
          <input
            type="text"
            value={form.signature_name}
            onChange={(e) => setForm({ ...form, signature_name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-beige focus:border-dore outline-none"
          />
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-4 border-t border-beige">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 btn-gradient text-blanc rounded-full disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Enregistrer le template
          </button>
        </div>
      </div>

      {/* Preview hint */}
      <div className="mt-6 p-4 bg-dore/10 rounded-xl">
        <p className="text-sm text-noir-light">
          <strong className="text-noir">Astuce :</strong> Pour tester le rendu de l&apos;email,
          remplissez le formulaire &quot;3 techniques&quot; sur le site avec votre propre adresse email.
        </p>
      </div>
    </div>
  );
}

// ============================================
// LEAD SUBMISSIONS TAB
// ============================================
function LeadSubmissionsTab({
  submissions,
  onRefresh,
}: {
  submissions: LeadSubmission[];
  onRefresh: () => void;
}) {
  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce lead ?")) return;
    await supabase.from("lead_submissions").delete().eq("id", id);
    onRefresh();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleExportCSV = () => {
    const headers = ["Prénom", "Email", "Téléphone", "Email envoyé", "Date"];
    const rows = submissions.map((s) => [
      s.prenom,
      s.email,
      s.telephone || "",
      s.email_sent ? "Oui" : "Non",
      formatDate(s.created_at),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads_materis_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-serif text-noir">
          {submissions.length} lead(s) - 3 Techniques
        </h2>
        {submissions.length > 0 && (
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-blanc text-noir rounded-full shadow-soft hover:shadow-lg transition-shadow"
          >
            <FileText size={18} />
            Exporter CSV
          </button>
        )}
      </div>

      {submissions.length === 0 ? (
        <div className="bg-blanc rounded-2xl p-12 shadow-soft text-center">
          <Gift size={48} className="mx-auto text-beige mb-4" />
          <p className="text-noir-light">Aucun lead pour le moment.</p>
          <p className="text-sm text-noir-light/60 mt-2">
            Les leads apparaîtront ici quand quelqu&apos;un remplira le formulaire &quot;3 techniques&quot;.
          </p>
        </div>
      ) : (
        <div className="bg-blanc rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full">
            <thead className="bg-clair">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-noir">Prénom</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-noir">Email</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-noir hidden md:table-cell">Téléphone</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-noir hidden lg:table-cell">Date</th>
                <th className="text-center px-6 py-4 text-sm font-medium text-noir">Email</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige">
              {submissions.map((lead) => (
                <tr key={lead.id} className="hover:bg-clair/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-noir">{lead.prenom}</span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-dore hover:underline"
                    >
                      {lead.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {lead.telephone ? (
                      <a
                        href={`tel:${lead.telephone}`}
                        className="text-noir-light hover:text-dore"
                      >
                        {lead.telephone}
                      </a>
                    ) : (
                      <span className="text-noir-light/50">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-noir-light hidden lg:table-cell">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {lead.email_sent ? (
                      <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        <Check size={12} />
                        Envoyé
                      </span>
                    ) : (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                        En attente
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

