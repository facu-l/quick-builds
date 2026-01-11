import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  title: string;
  description: string;
  price?: string;
  features: string[];
  delay?: number;
  highlight?: boolean;
}

export function PricingCard({ title, description, price, features, delay = 0, highlight = false }: PricingCardProps) {
  const phone = "5492213074387";
  const message = encodeURIComponent(`Hola Ludmila, quiero empezar el plan de ${title}. ¿Me pasás info y cómo arrancamos?`);
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`relative p-8 rounded-3xl h-full flex flex-col transition-all duration-300 group
        ${highlight 
          ? "bg-gradient-to-br from-primary/20 to-card border-2 border-primary/50 shadow-[0_0_30px_rgba(132,255,0,0.15)]" 
          : "bg-card border border-white/5 hover:border-primary/30"
        }
      `}
    >
      <div className="mb-6">
        <h3 className="text-3xl font-bold mb-2 uppercase text-white group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      {price && (
        <div className="mb-8">
          <span className="text-4xl font-bold font-display text-white">{price}</span>
          <span className="text-muted-foreground">/mes</span>
        </div>
      )}

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-300">
            <div className={`mt-1 p-0.5 rounded-full ${highlight ? "bg-primary text-black" : "bg-white/10 text-primary"}`}>
              <Check className="w-3 h-3" strokeWidth={4} />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button 
        className={`w-full h-12 text-lg font-bold uppercase tracking-wider
          ${highlight 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "bg-white/10 hover:bg-white/20 text-white"
          }
        `}
        asChild
      >
        <a href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer">Empezar Ahora</a>
      </Button>
    </motion.div>
  );
}
