interface MapProps {
  address: string;
}

export function Map({ address }: MapProps) {
  // Encode address for Google Maps embed URL
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=14`;

  return (
    <section className="w-full">
      <iframe
        src={mapUrl}
        width="100%"
        height="350"
        style={{ border: 0, display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Locatie op kaart"
      />
    </section>
  );
}
