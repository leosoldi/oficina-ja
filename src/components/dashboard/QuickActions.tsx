
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  FileText, 
  Settings, 
  CheckCircle,
  Activity,
  Edit
} from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Link to="/workshop/agendamentos">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-700">Agendamentos</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/workshop/orcamentos">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-700">Orçamentos</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/workshop/servicos">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <CardContent className="p-4 text-center">
              <Settings className="h-8 w-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-700">Serviços</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/workshop/checklists">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-700">Checklists</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/workshop/historico">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 text-indigo-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-700">Histórico</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/workshop/perfil">
          <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <CardContent className="p-4 text-center">
              <Edit className="h-8 w-8 text-gray-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-sm font-medium text-gray-700">Perfil</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
