
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 md:w-64 md:h-64 bg-orange-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Brand */}
          <div className="space-y-4 md:space-y-6 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <span className="text-2xl md:text-3xl font-bold">
                <span className="text-white">Oficina</span>
                <span className="text-orange-500">Já</span>
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-sm">
              Conectando motoristas às melhores oficinas mecânicas. Sua plataforma de confiança para manutenção automotiva.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3 md:space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-gray-800 hover:bg-orange-600 p-2 md:p-3 rounded-lg transition-all duration-300 transform hover:scale-110 group touch-target"
                >
                  <social.icon className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-4 md:mb-6 text-white">Links Úteis</h3>
            <ul className="space-y-2 md:space-y-3">
              {[
                { href: "#motoristas", text: "Para Motoristas" },
                { href: "#oficinas", text: "Para Oficinas" },
                { href: "#como-funciona", text: "Como Funciona" },
                { href: "#", text: "Termos de Uso" },
                { href: "#", text: "Política de Privacidade" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 relative group text-sm md:text-base touch-target py-1"
                  >
                    {link.text}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-4 md:mb-6 text-white">Suporte</h3>
            <ul className="space-y-2 md:space-y-3">
              {[
                { href: "#", text: "Central de Ajuda" },
                { href: "#", text: "FAQ" },
                { href: "#", text: "Fale Conosco" },
                { href: "#", text: "Reportar Problema" },
                { href: "#", text: "Status do Sistema" }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-300 relative group text-sm md:text-base touch-target py-1"
                  >
                    {link.text}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div id="contato">
            <h3 className="font-semibold text-base md:text-lg mb-4 md:mb-6 text-white">Contato</h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="bg-orange-500/20 p-2 rounded-lg group-hover:bg-orange-500/30 transition-colors duration-300">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-orange-400 shrink-0" />
                </div>
                <div>
                  <span className="text-gray-300 text-xs md:text-sm block">São Paulo, SP - Brasil</span>
                  <span className="text-gray-400 text-xs">Rua das Oficinas, 123</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="bg-orange-500/20 p-2 rounded-lg group-hover:bg-orange-500/30 transition-colors duration-300">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-orange-400 shrink-0" />
                </div>
                <span className="text-gray-300 text-xs md:text-sm">(11) 9999-9999</span>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="bg-orange-500/20 p-2 rounded-lg group-hover:bg-orange-500/30 transition-colors duration-300">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-orange-400 shrink-0" />
                </div>
                <span className="text-gray-300 text-xs md:text-sm">contato@oficinaja.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-4 md:mt-6">
              <h4 className="font-medium text-white mb-3 text-sm md:text-base">Newsletter</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-orange-400 focus:outline-none text-sm"
                />
                <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium touch-target">
                  Assinar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              © 2024 OficinaJá. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 md:space-x-6">
              {['Termos', 'Privacidade', 'Cookies'].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-300 text-xs md:text-sm relative group touch-target"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
