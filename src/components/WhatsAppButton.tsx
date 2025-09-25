import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WhatsAppButton = () => {
  // TODO: Replace with the correct phone number
  const phoneNumber = "5521991732847"; // Example: 55 (Brazil) + 21 (Rio) + 999999999 (Number)
  const message = "Olá! Gostaria de mais informações sobre o PraiAtiva.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-cta text-cta-foreground shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-cta-hover"
          aria-label="Fale conosco no WhatsApp"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.52C8.75 21.33 10.37 21.8 12.04 21.8H12.05C17.5 21.8 21.95 17.35 21.95 11.89C21.95 9.28 20.95 6.88 19.13 5.05C17.3 3.23 14.89 2.22 12.28 2.22L12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.5 17.89 6.09C19.48 7.67 20.32 9.74 20.31 11.91C20.31 16.4 16.62 20.12 12.12 20.12H12.09C10.62 20.12 9.18 19.7 7.97 18.9L7.67 18.72L3.78 19.73L4.8 15.9L4.6 15.58C3.73 14.28 3.27 12.79 3.78 11.91C3.78 7.42 7.5 3.7 12.01 3.7L12.05 3.67ZM10.03 6.89C9.83 6.89 9.66 6.9 9.49 7.2C9.32 7.5 8.8 8.03 8.8 9.05C8.8 10.07 9.51 11.06 9.68 11.26C9.85 11.47 11.17 13.73 13.42 14.68C15.67 15.63 15.67 15.22 16.13 15.19C16.59 15.16 17.55 14.6 17.75 14.04C17.95 13.48 17.95 13.01 17.85 12.91C17.75 12.81 17.58 12.74 17.31 12.61C17.04 12.48 15.91 11.95 15.68 11.85C15.45 11.75 15.28 11.72 15.11 11.95C14.94 12.18 14.47 12.74 14.34 12.91C14.21 13.08 14.08 13.12 13.84 13C13.61 12.88 12.78 12.61 11.76 11.73C10.93 11.02 10.37 10.13 10.24 9.87C10.11 9.6 10.21 9.47 10.31 9.37C10.4 9.27 10.53 9.11 10.66 8.98C10.79 8.85 10.82 8.75 10.92 8.58C11.02 8.42 10.99 8.28 10.92 8.15C10.86 8.02 10.45 6.9 10.25 6.9Z"
            />
          </svg>
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p>Fale conosco no WhatsApp</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default WhatsAppButton;