"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, BookOpen, Stethoscope, Quote, MessageCircle } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

const timeline = [
  { year: "1997", event: "Diplômée kinésithérapie (Toulouse)" },
  { year: "1997-2004", event: "6 ans d'études d'ostéopathie, école André Ratio" },
  { year: "1998", event: "Premier cabinet à Saint-Jean avec Florence" },
  { year: "2004", event: "Diplôme d'ostéopathie" },
  { year: "2007", event: "Professeure en viscéral au CSO Toulouse" },
  { year: "2014", event: "Diplôme d'étiomédecine (Max Bernardeau)" },
  { year: "2015", event: "Conférence EndoFrance + Création Pôle Féminin" },
  { year: "2018", event: "Formation AERO (4 ans + groupe continu)" },
  { year: "2022", event: "Ouverture cabinet de Quint avec son fils Florian" },
  { year: "2024", event: "Naissance de MATERIS" },
];

export default function AProposContent() {
  return (
    <>
      {/* Section Parcours */}
      <SectionWrapper background="clair" immediate>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-soft">
              <div className="aspect-[4/5] relative">
                <Image
                  src="/photo_sandrine-verticale.png"
                  alt="Sandrine, fondatrice de MATERIS"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-dore/10 rounded-full blur-2xl" />
          </motion.div>

          {/* Content */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-medium tracking-widest uppercase text-dore mb-4"
            >
              Mon parcours
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif text-noir leading-tight mb-6"
            >
              Comment les maux ont guidé ma vocation
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg text-noir-light"
            >
              <p>
                Je suis née à Carcassonne, et c&apos;est là que ma vocation a pris racine… 
                un peu malgré moi. À la suite d&apos;un <strong>accident de mobylette</strong>, 
                j&apos;ai passé de longs mois en rééducation.
              </p>
              <p>
                Une expérience marquante, parfois douloureuse — et une révélation : 
                <em> je voulais faire ce métier.</em>
              </p>
              <p>
                De la kinésithérapie à l&apos;ostéopathie, puis à l&apos;ostéopathie gynécologique, 
                chaque étape m&apos;a rapprochée de ce qui allait devenir ma spécialité : 
                <strong> accompagner les femmes </strong> dans leurs douleurs les plus intimes.
              </p>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper background="creme" immediate>
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-noir text-center mb-12"
          >
            25 ans de parcours
          </motion.h2>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-beige md:-translate-x-px" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-6 mb-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-dore rounded-full -translate-x-1/2 ring-4 ring-creme" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="text-dore font-serif text-lg">{item.year}</span>
                  <p className="text-noir-light mt-1">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Confession - IMPROVED */}
      <section className="relative py-20 md:py-28 bg-noir overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-dore blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-dore blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm font-medium tracking-widest uppercase text-dore mb-4">
              Ma confession
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-blanc leading-tight">
              Et puis, la vie m&apos;a arrêtée…
            </h2>
          </motion.div>

          <div className="space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-blanc/80 leading-relaxed"
            >
              En 2024, la vie m&apos;a stoppée. <span className="text-dore font-medium">Une maladie aux mains.</span> Au départ 
              l&apos;annonce d&apos;une maladie neurologique centrale. Un vertige m&apos;a saisie, 
              la peur, l&apos;incompréhension.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-blanc/80 leading-relaxed italic"
            >
              Pour une ostéopathe, ne plus pouvoir se servir de ses mains... vous imaginez ?
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-blanc/70 leading-relaxed"
            >
              Le diagnostic a été invalidé... mais me voilà partie pour un parcours de santé 
              qui continue encore. Les soins, une première chirurgie, la rééducation...
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="py-8"
            >
              <p className="text-blanc/60 text-lg mb-4">
                Mais toujours cette petite voix :
              </p>
              <p className="text-xl md:text-2xl text-blanc/90 italic">
                &quot;Pourquoi la vie t&apos;a enlevé ce que tu aimes le plus au monde ?&quot;
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg text-blanc/70 leading-relaxed"
            >
              J&apos;ai décidé de ne pas subir cet arrêt, mais d&apos;en faire un espace fertile. 
              J&apos;ai exploré des approches plus subtiles : reiki, magnétisme, quantum énergie, 
              soins énergétiques, féminin sacré...
            </motion.p>

            {/* Quote highlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="relative my-12 py-8 px-8 md:px-12"
            >
              <Quote size={48} className="absolute top-0 left-0 text-dore/30" />
              <blockquote className="text-2xl md:text-3xl font-serif text-dore text-center leading-relaxed">
                
“Il est temps de transmettre. De former d'autres mains pour qu'elles soulagent encore plus de femmes.”
              </blockquote>
              <Quote size={48} className="absolute bottom-0 right-0 text-dore/30 rotate-180" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-lg text-blanc/80 leading-relaxed">
                J&apos;avais l&apos;expertise, l&apos;expérience et la sensibilité à partager. 
                J&apos;avais déjà accompagné de nombreux étudiants. J&apos;avais déjà transmis 
                à mon propre fils, devenu ostéopathe.
              </p>

              <p className="text-xl md:text-2xl font-serif text-blanc pt-4">
                Il est temps de transmettre. De former d&apos;autres mains pour qu&apos;elles 
                soulagent encore plus de femmes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ma façon d'accompagner */}
      <SectionWrapper background="clair">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-widest uppercase text-dore mb-4"
          >
            Ma philosophie
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-noir mb-8"
          >
            Ma façon d&apos;accompagner
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg text-noir-light mx-auto"
          >
            <p>
              Ce que je veux transmettre aujourd&apos;hui, ce n&apos;est pas seulement des 
              techniques spécifiques d&apos;ostéopathie gynécologique.
            </p>
            <p>
              C&apos;est une <strong>posture</strong>. Une <strong>écoute</strong>. 
              Une <strong>conscience du geste</strong>.
            </p>
            <p>
              C&apos;est la capacité à <em>ressentir</em> ce qui est juste ou pas, 
              à <em>choisir</em> quand intervenir ou non, à devenir un(e) praticien(ne) 
              en santé féminine, sensible et ancré(e).
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 p-6 bg-dore/10 rounded-xl inline-block"
          >
            <p className="text-noir-light text-sm">
              L&apos;accompagnement proposé est <strong>complémentaire</strong> au suivi médical 
              et <strong>ne le remplace pas</strong>.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Mon quotidien - IMPROVED */}
      <SectionWrapper background="creme">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Title + Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium tracking-widest uppercase text-dore mb-4">
              Au quotidien
            </p>

            <h2 className="text-3xl md:text-4xl font-serif text-noir mb-6">
              Ma vie, entre cabinet et famille
            </h2>

            <p className="text-noir-light text-lg mb-8">
              Au-delà de la pratique, je suis avant tout maman de 4 enfants. 
              C&apos;est cette vie riche et intense qui nourrit ma vision du soin 
              et ma façon d&apos;accompagner.
            </p>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blanc p-5 rounded-xl shadow-soft">
                <div className="flex items-center gap-3 mb-2">
                  <Heart size={20} className="text-dore" />
                  <span className="font-medium text-noir">4 enfants</span>
                </div>
                <p className="text-sm text-noir-light">
                  3 fils (25, 24, 18 ans) + 1 fille (10 ans)
                </p>
              </div>

              <div className="bg-blanc p-5 rounded-xl shadow-soft">
                <div className="flex items-center gap-3 mb-2">
                  <Users size={20} className="text-dore" />
                  <span className="font-medium text-noir">Florian</span>
                </div>
                <p className="text-sm text-noir-light">
                  Mon fils aîné, devenu ostéopathe
                </p>
              </div>

              <div className="bg-blanc p-5 rounded-xl shadow-soft">
                <div className="flex items-center gap-3 mb-2">
                  <Stethoscope size={20} className="text-dore" />
                  <span className="font-medium text-noir">Recherche</span>
                </div>
                <p className="text-sm text-noir-light">
                  Dyspareunies à la Clinique Rive Gauche
                </p>
              </div>

              <div className="bg-blanc p-5 rounded-xl shadow-soft">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen size={20} className="text-dore" />
                  <span className="font-medium text-noir">AERO</span>
                </div>
                <p className="text-sm text-noir-light">
                  Groupe de recherche continu
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: WhatsApp teaser */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-blanc rounded-2xl shadow-soft p-8 md:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <MessageCircle size={28} className="text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-medium text-noir">Groupe WhatsApp</h3>
                  <p className="text-sm text-noir-light">Échanges quotidiens avec les praticiens</p>
                </div>
              </div>

              {/* Fake chat messages */}
              <div className="space-y-4">
                <div className="bg-creme rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-sm text-noir-light">
                    &quot;Sandrine, j&apos;ai un cas complexe aujourd&apos;hui. Patiente avec endométriose 
                    stade 4, qu&apos;est-ce que tu me conseilles ?&quot;
                  </p>
                  <span className="text-xs text-noir-light/60 mt-2 block">Marie • 09:34</span>
                </div>

                <div className="bg-dore/10 rounded-2xl rounded-tr-none p-4 max-w-[80%] ml-auto">
                  <p className="text-sm text-noir-light">
                    &quot;Je te réponds par vocal, c&apos;est plus simple ! Mais en attendant, 
                    commence par le protocole de tests qu&apos;on a vu ensemble...&quot;
                  </p>
                  <span className="text-xs text-noir-light/60 mt-2 block">Sandrine • 09:41</span>
                </div>

                <div className="bg-creme rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-sm text-noir-light">
                    &quot;Merci ! C&apos;est tellement rassurant de pouvoir te demander en direct 💛&quot;
                  </p>
                  <span className="text-xs text-noir-light/60 mt-2 block">Marie • 09:45</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-beige">
                <p className="text-noir-light text-sm italic text-center">
                  &quot;Je partage beaucoup en direct avec mes praticiens via WhatsApp.&quot;
                </p>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-dore/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper background="clair">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-noir mb-6"
          >
            Envie de rejoindre l&apos;aventure MATERIS ?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button href="/formations" variant="primary" icon={<ArrowRight size={18} />}>
              Découvrir les formations
            </Button>
            <Button href="/reseau-materis" variant="outline">
              Rejoindre le réseau
            </Button>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}

