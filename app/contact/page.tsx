export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600">1-Babar Commercial Center, Kutchery Road, Multan</p>
          <p className="text-gray-600 mt-2">📞 0300-8733555 | 03006773555</p>
          <p className="text-gray-600">✉️ akhtarmazhar@gmail.com</p>
          <div className="mt-4">
            <h4 className="text-gray-900 font-semibold">Business Hours</h4>
            <p className="text-gray-600">Mon‑Sat: 10:00 AM – 8:00 PM</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded hover:bg-primary-bright transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          {/* Google Maps embed - Now pointing to the exact shop location */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.280267648513!2d71.4642983!3d30.200547299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b33e4c3cfa21b%3A0xf9624912f8f63e43!2sFive%20Star%20Electronics%20Plus!5e0!3m2!1sen!2s!4v1786467683408!5m2!1sen!2s"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      </div>
    </div>
  );
}