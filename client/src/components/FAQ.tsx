import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Wat is de levensduur van een nieuw dak?",
    answer: "De levensduur hangt af van het type materiaal. Pannendaken gaan 40-50 jaar mee, bitumen dakbedekking 15-25 jaar, en EPDM rubber voor platte daken kan 30-50 jaar meegaan. Goed onderhoud is essentieel voor een lange levensduur.",
  },
  {
    question: "Welke garantie bieden jullie op dakwerkzaamheden?",
    answer: "Wij bieden standaard 10 jaar garantie op ons vakmanschap en materiaal. Voor bepaalde premium materialen gelten zelfs garanties tot 20-30 jaar. Alle garantievoorwaarden worden duidelijk in de offerte vermeld.",
  },
  {
    question: "Wat zijn de kosten van een nieuwe dakbedekking?",
    answer: "De kosten variëren afhankelijk van de grootte van uw dak, het type materiaal en de complexiteit van het werk. Een indicatieve prijs voor een standaard woonhuis ligt tussen €5.000 en €15.000. Voor een exacte offerte komen wij graag vrijblijvend langs.",
  },
  {
    question: "Hoe lang duurt een gemiddelde dakrenovatie?",
    answer: "De duur van een dakrenovatie hangt af van de grootte en complexiteit van het project. Een standaard woonhuis dak kan binnen 3-5 werkdagen worden vervangen. Bij grotere projecten of complexe daken kan dit langer duren. Wij geven u vooraf een duidelijke planning.",
  },
  {
    question: "Kunnen jullie ook spoedklussen uitvoeren?",
    answer: "Ja, wij begrijpen dat lekkages en dakschade niet kunnen wachten. Voor spoedklussen proberen wij binnen 24 uur ter plaatse te zijn. Neem direct telefonisch contact met ons op voor spoedreparaties.",
  },
  {
    question: "Is een offerte vrijblijvend?",
    answer: "Ja, onze offertes zijn altijd vrijblijvend en kosteloos. Wij komen graag bij u langs om uw dak te inspecteren en een gedetailleerde offerte op maat te maken, zonder enige verplichting.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 lg:py-32 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins mb-4 text-foreground">
            Veelgestelde Vragen
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Antwoorden op de meest gestelde vragen over onze diensten
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-card-border rounded-lg px-6 data-[state=open]:shadow-md transition-shadow"
                data-testid={`accordion-faq-${index}`}
              >
                <AccordionTrigger className="text-left font-semibold text-base md:text-lg hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
