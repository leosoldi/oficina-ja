import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Calendar,
  CheckCircle,
  Circle,
  Star,
  Copy,
  Edit,
  Trash2,
} from "lucide-react";
import { Checklist } from "@/types/checklist";

interface ChecklistCardProps {
  checklist: Checklist;
  onUse?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onDuplicate?: (id: number) => void;
}

const ChecklistCard = ({
  checklist,
  onUse,
  onEdit,
  onDelete,
  onDuplicate,
}: ChecklistCardProps) => {
  console.log(checklist);
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "inspection":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-green-100 text-green-800";
      case "repair":
        return "bg-red-100 text-red-800";
      case "custom":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "inspection":
        return "Inspeção";
      case "maintenance":
        return "Manutenção";
      case "repair":
        return "Reparo";
      case "custom":
        return "Personalizado";
      default:
        return category;
    }
  };

  const completedItems = checklist.items.filter((i) => i.completed).length;
  const totalItems = checklist.items.length;
  const completionPercentage =
    totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {checklist.title}
              </h3>
              {checklist.isTemplate && (
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              )}
            </div>

            <p className="text-sm text-gray-600 mb-3">
              {checklist.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className={getCategoryColor(checklist.category)}>
                {getCategoryLabel(checklist.category)}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {totalItems} itens
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Usado {checklist.usageCount}x
              </Badge>
            </div>
          </div>
        </div>

        {/* Progresso */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>Progresso</span>
            <span>
              {completedItems}/{totalItems} ({Math.round(completionPercentage)}
              %)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Prévia dos itens */}
        <div className="mb-4">
          <div className="space-y-1">
            {checklist.items.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-2 text-sm">
                {item.completed ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Circle className="h-4 w-4 text-gray-400" />
                )}
                <span
                  className={
                    item.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-700"
                  }
                >
                  {item.text}
                </span>
                {item.required && (
                  <span className="text-red-500 text-xs">*</span>
                )}
              </div>
            ))}
            {checklist.items.length > 3 && (
              <div className="text-xs text-gray-500 ml-6">
                +{checklist.items.length - 3} itens adicionais
              </div>
            )}
          </div>
        </div>

        {/* Rodapé */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            {checklist.updatedAt
              ? `Usado em ${new Date(checklist.updatedAt).toLocaleDateString(
                  "pt-BR"
                )}`
              : "Nunca usado"}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate?.(checklist.id);
              }}
              className="text-gray-600 hover:text-blue-600"
              aria-label="Duplicar checklist"
              title="Duplicar"
            >
              <Copy className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(checklist.id);
              }}
              className="text-gray-600 hover:text-blue-600"
              aria-label="Editar checklist"
              title="Editar"
            >
              <Edit className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(checklist.id);
              }}
              className="text-gray-600 hover:text-red-600"
              aria-label="Excluir checklist"
              title="Excluir"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onUse?.(checklist.id);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              aria-label="Usar checklist"
              title="Usar"
            >
              <FileText className="h-4 w-4 mr-1" />
              Usar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistCard;
