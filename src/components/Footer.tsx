import React from 'react';
import { Wrench, MapPin, Phone, Mail } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              
              <span className="text-2xl font-bold">OficinaJá</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Conectando motoristas às melhores oficinas mecânicas. Sua plataforma de confiança para manutenção automotiva.
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li><a href="#motoristas" className="text-gray-300 hover:text-orange-500 transition-colors">Para Motoristas</a></li>
              <li><a href="#oficinas" className="text-gray-300 hover:text-orange-500 transition-colors">Para Oficinas</a></li>
              <li><a href="#como-funciona" className="text-gray-300 hover:text-orange-500 transition-colors">Como Funciona</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Fale Conosco</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Reportar Problema</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div id="contato">
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 shrink-0" />
                <span className="text-gray-300 text-sm">São Paulo, SP - Brasil</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500 shrink-0" />
                <span className="text-gray-300 text-sm">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500 shrink-0" />
                <span className="text-gray-300 text-sm">contato@oficinaja.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 OficinaJá. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Termos
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Privacidade
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;