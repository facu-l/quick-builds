import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useContact } from "@/hooks/use-contact";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { SectionHeader } from "@/components/SectionHeader";
import { PricingCard } from "@/components/PricingCard";
import { 
  Dumbbell, 
  Flame, 
  Target, 
  Instagram, 
  Mail, 
  Menu, 
  X,
  ChevronDown,
  Users
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  /* ACCESS KEY EMAIL */
  const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const onSubmit = async (data: InsertInquiry) => {
    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "Nuevo mensaje desde la landing (Ludmila Montes)",
        from_name: data.name,
        replyto: data.email,
        name: data.name,
        email: data.email,
        message: data.message,
  
        // anti-spam simple (honeypot)
        botcheck: ""
      };
  
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const result = await res.json();
  
      if (!result.success) {
        throw new Error(result.message || "No se pudo enviar el mensaje.");
      }
  
      form.reset();
      alert("¡Mensaje enviado! Ludmila te responde a la brevedad.");
    } catch (err) {
      console.error(err);
      alert("No se pudo enviar el mensaje. Probá de nuevo en unos minutos.");
    }
  };

  const navItems = [
    { name: "Sobre Mí", to: "about" },
    { name: "Rutinas", to: "plans" },
    { name: "Asesorías", to: "coaching" },
    { name: "Contacto", to: "contact" },
  ];
  /* Mensaje directo a WhatsApp */
  const phone = "5492213074387";
  const asesoriasMessage = encodeURIComponent("Hola Ludmila, quiero consultar por las ASESORÍAS 1 a 1. ¿Me contás cómo funciona?");
  const asesoriasWhatsappUrl = `https://wa.me/${phone}?text=${asesoriasMessage}`;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground dark">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold font-display tracking-widest uppercase italic">
            Ludmila<span className="text-primary"> Montes</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <ScrollLink
                key={item.name}
                to={item.to}
                smooth={true}
                offset={-80}
                duration={500}
                className="text-sm font-semibold uppercase tracking-widest cursor-pointer hover:text-primary transition-colors"
              >
                {item.name}
              </ScrollLink>
            ))}
            <Button className="bg-primary text-white font-bold uppercase" asChild>
              <ScrollLink to="contact" smooth={true} offset={-80}>
                Empezar
              </ScrollLink>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button 
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-white/10 p-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <ScrollLink
                key={item.name}
                to={item.to}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-semibold uppercase tracking-widest cursor-pointer p-2 hover:bg-white/5 rounded"
              >
                {item.name}
              </ScrollLink>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-display uppercase tracking-tighter leading-none mb-6">
              Ludmila <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-500">
                Montes
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light">
              Entrenamiento personalizado diseñado para superar tus límites y alcanzar tu mejor versión.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary text-white font-bold uppercase" asChild>
                <ScrollLink to="plans" smooth={true} offset={-80}>
                  Ver Planes
                </ScrollLink>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 hover:bg-white/10 text-white font-bold uppercase" asChild>
                <ScrollLink to="about" smooth={true} offset={-80}>
                  Conóceme
                </ScrollLink>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted group border border-white/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=2070&auto=format&fit=crop" 
                alt="Personal Trainer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-3xl font-display font-bold uppercase text-white mb-1">Ludmila Montes</h3>
                <p className="text-primary font-bold tracking-widest text-sm">PERSONAL TRAINER CERTIFICADA</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-7xl font-bold font-display uppercase leading-none mb-8">
                Fuerza <br /> <span className="text-primary">& Estilo</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Hola, soy Ludmila Montes. Mi enfoque combina la intensidad del entrenamiento de fuerza con un estilo de vida saludable y equilibrado. Creo que cada persona tiene un potencial oculto esperando ser liberado.
                </p>
                <p>
                  Con años de experiencia, he ayudado personas a transformar no solo su físico, sino también su mentalidad y disciplina.
                </p>
                <p>

                </p>
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div>
                    <h4 className="text-3xl font-bold text-white mb-1 font-display">SEGUIMIENTO</h4>
                    <p className="text-sm uppercase tracking-wide">IDEAS DE NUTRICIÓN SALUDABLE</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-white mb-1 font-display">1 A 1</h4>
                    <p className="text-sm uppercase tracking-wide">ENFOQUE PERSONAL</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-24 relative overflow-hidden">
        <div className="container relative z-10 mx-auto px-4">
          <SectionHeader 
            title="Mis Rutinas" 
            subtitle="Planes diseñados específicamente para tus objetivos. Elige el camino hacia tu mejor versión."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              title="Hipertrofia"
              description="Maximiza tu ganancia muscular con un enfoque científico."
              features={["Rutina de 5 días", "Sobrecarga progresiva", "Guía de volumen", "Video demostraciones"]}
              delay={0.1}
            />
            <PricingCard 
              title="Pérdida de Peso"
              description="Quema grasa manteniendo tu masa muscular intacta."
              features={["Rutina metabólica", "Cardio estratégico", "Plan de déficit", "Recetario saludable"]}
              delay={0.2}
            />
            <PricingCard 
              title="Recomposición"
              description="Gana músculo y pierde grasa simultáneamente."
              features={["Rutina híbrida", "Ciclo de carbohidratos", "Enfoque en rendimiento", "Guía de suplementos"]}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Asesorias Section */}
      <section id="coaching" className="py-24 bg-card/30 border-y border-white/5">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Asesorías 1 a 1" 
            subtitle="Un acompañamiento exclusivo para resultados garantizados."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-black/40 p-8 rounded-3xl border border-primary/20 relative"
            >
              <Users className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-3xl font-bold uppercase mb-4">Seguimiento Personalizado</h3>
              <ul className="space-y-4 text-muted-foreground text-lg">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Plan de entrenamiento 100% personalizado
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Ideas de nutrición saludable y flexible
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Contacto directo vía WhatsApp para dudas
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Ajustes semanales según tu progreso
                </li>
              </ul>
              <Button className="mt-8 w-full h-12 bg-white text-black font-bold uppercase hover:bg-primary hover:text-white transition-all" asChild>
                <a href={asesoriasWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  Consultar Cupos
                </a>
              </Button>
            </motion.div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" 
                alt="Personal Training session"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Contáctame" 
            subtitle="¿Listo para empezar? Envíame un mensaje y diseñemos tu plan perfecto."
          />
          <div className="max-w-2xl mx-auto bg-card border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre" {...field} className="bg-background/50 border-white/10 focus:border-primary h-12 rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="tu@email.com" {...field} className="bg-background/50 border-white/10 focus:border-primary h-12 rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Mensaje</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Cuéntame sobre tus objetivos..." className="bg-background/50 border-white/10 focus:border-primary min-h-[150px] resize-none rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-14 bg-primary text-white font-bold uppercase tracking-widest hover:bg-rose-600 rounded-xl text-lg mt-4" 
                >
                  Enviar Mensaje
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8 text-muted-foreground">
            <a href="https://instagram.com/luu.montes__"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
              >
              <Instagram className="w-5 h-5" />
              <span className="uppercase text-sm tracking-widest">@luu.montes__</span>
            </a>
            <div className="hidden md:block w-px h-4 bg-white/10" />
            <a href="mailto:ludmila@fitness.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
              <span className="uppercase text-sm tracking-widest">ludmilamontes29@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-white/5 bg-background">
        <p>&copy; 2024 LUDMILA MONTES COACHING. TODOS LOS DERECHOS RESERVADOS.</p>
      </footer>
    </div>
  );
}
