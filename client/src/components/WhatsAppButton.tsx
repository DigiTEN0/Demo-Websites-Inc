import { SiWhatsapp } from "react-icons/si";

interface WhatsAppButtonProps {
  phoneNumber: string;
}

export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300 z-50"
      data-testid="button-whatsapp"
      aria-label="Contact via WhatsApp"
    >
      <SiWhatsapp className="h-8 w-8" />
    </button>
  );
}
