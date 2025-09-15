import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft, Check, X, AlertCircle, Clock, Plus, Wrench, Trash2, ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

import {
  checklistService,
  type ChecklistDTO,
  type ChecklistItemDTO,
} from "@/services/Checklist";

type ChecklistPart = {
  id: number;
  name: string;
  quantity: number;
  estimatedPrice?: number;
  notes?: string;
};

const ChecklistExecution: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [checklist, setChecklist] = useState<ChecklistDTO | null>(null);
  const [items, setItems] = useState<ChecklistItemDTO[]>([]);
  const [notes, setNotes] = useState("");
  const [startTime] = useState(new Date());
  const [parts, setParts] = useState<ChecklistPart[]>([]);
  const [isAddPartModalOpen, setIsAddPartModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [newPart, setNewPart] = useState({
    name: "",
    quantity: 1,
    estimatedPrice: "",
    notes: "",
  });

  // Carrega checklist do backend
  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await checklistService.getById(id);
        if (cancelled) return;
        setChecklist(data);
        setItems((data.items ?? []).map((it) => ({ ...it, completed: it.completed ?? false })));
      } catch {
        toast({
          title: "Erro ao carregar checklist",
          description: "Tente novamente em instantes.",
          variant: "destructive",
        });
        navigate("/workshop/checklists");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, navigate, toast]);

  const handleItemToggle = (itemId: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, completed: !it.completed } : it))
    );
  };

  const requiredItems = items.filter((i) => i.required);
  const completedRequired = requiredItems.filter((i) => i.completed).length;

  const handleComplete = () => {
    if (completedRequired < requiredItems.length) {
      toast({
        title: "Itens obrigatórios pendentes",
        description: "Complete todos os itens obrigatórios antes de finalizar.",
        variant: "destructive",
      });
      return;
    }
    setIsFinishModalOpen(true);
  };

  async function persistCompletion() {
    if (!id) return;
    await checklistService.complete(id, {
      notes,
      items: items.map(({ id, completed }) => ({ id, completed: !!completed })),
      parts: parts.map((p) => ({
        name: p.name,
        quantity: p.quantity,
        estimatedPrice: p.estimatedPrice,
        notes: p.notes,
      })),
    });
  }

  const handleFinishWithoutQuote = async () => {
    try {
      await persistCompletion();
      toast({ title: "Checklist concluído", description: `${checklist?.title} finalizado.` });
      navigate("/workshop/checklists", { replace: true });
    } catch {
      toast({
        title: "Erro ao finalizar",
        description: "Não foi possível salvar a conclusão.",
        variant: "destructive",
      });
    }
  };

  const handleFinishWithQuote = async () => {
    try {
      await persistCompletion();
    } catch {
      /* opcional: bloquear navegação em caso de erro */
    }
    const quoteData = {
      parts: parts.map((part) => ({
        description: part.name,
        quantity: part.quantity,
        unitPrice: part.estimatedPrice || 0,
        total: (part.estimatedPrice || 0) * part.quantity,
        notes: part.notes,
      })),
      checklistId: checklist?.id,
      checklistTitle: checklist?.title,
      checklistNotes: notes,
    };
    navigate("/workshop/orcamentos/novo", { state: quoteData });
  };

  const handleAddPart = () => {
    if (!newPart.name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Digite o nome da peça.",
        variant: "destructive",
      });
      return;
    }
    const part: ChecklistPart = {
      id: Date.now(),
      name: newPart.name,
      quantity: newPart.quantity,
      estimatedPrice: newPart.estimatedPrice ? parseFloat(newPart.estimatedPrice) : undefined,
      notes: newPart.notes || undefined,
    };
    setParts((prev) => [...prev, part]);
    setNewPart({ name: "", quantity: 1, estimatedPrice: "", notes: "" });
    setIsAddPartModalOpen(false);
    toast({ title: "Peça adicionada", description: `${part.name} foi adicionada.` });
  };

  const handleRemovePart = (partId: number) => {
    setParts((prev) => prev.filter((p) => p.id !== partId));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "maintenance": return "bg-blue-500";
      case "inspection":  return "bg-green-500";
      case "repair":      return "bg-orange-500";
      case "custom":      return "bg-purple-500";
      default:            return "bg-gray-500";
    }
  };
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "maintenance": return "Manutenção";
      case "inspection":  return "Inspeção";
      case "repair":      return "Reparo";
      case "custom":      return "Personalizado";
      default:            return category;
    }
  };

  if (!checklist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Checklist não encontrado</h2>
          <Button onClick={() => navigate("/workshop/checklists")}>
            Voltar aos Checklists
          </Button>
        </div>
      </div>
    );
  }

  const completedCount = items.filter((i) => i.completed).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/workshop/checklists")}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold truncate">{checklist.title}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="secondary" className={`${getCategoryColor(checklist.category)} text-white text-xs`}>
                  {getCategoryLabel(checklist.category)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {completedCount}/{totalCount}
                </span>
              </div>
            </div>

            <div className="text-right text-xs text-muted-foreground hidden sm:block">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {startTime.toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progresso</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-1.5">
              <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-4 py-4 pb-20 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Sobre este checklist</CardTitle>
          </CardHeader>
        <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground leading-relaxed">{checklist.description}</p>
          </CardContent>
        </Card>

        {requiredItems.length > 0 && completedRequired < requiredItems.length && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-4 pb-3">
              <div className="flex items-center gap-2 text-orange-700">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm font-medium">
                  {requiredItems.length - completedRequired} itens obrigatórios pendentes
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Itens do Checklist</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  item.completed ? "bg-green-50 border-green-200" : "bg-background"
                }`}
              >
                <Checkbox
                  checked={!!item.completed}
                  onCheckedChange={() => handleItemToggle(item.id)}
                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 mt-0.5 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className={`text-sm leading-relaxed ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                    {item.text}
                  </span>
                  {item.required && (
                    <Badge variant="outline" className="ml-0 mt-1 text-xs block w-fit">
                      Obrigatório
                    </Badge>
                  )}
                </div>
                {item.completed && <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {parts.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Peças Necessárias ({parts.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {parts.map((part) => (
                <div key={part.id} className="flex items-start gap-3 p-3 rounded-lg border bg-blue-50">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{part.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemovePart(part.id)}
                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Quantidade: {part.quantity}
                      {part.estimatedPrice && (
                        <span className="ml-2">• Preço estimado: R$ {part.estimatedPrice.toFixed(2)}</span>
                      )}
                    </div>
                    {part.notes && <p className="text-xs text-muted-foreground mt-1 italic">{part.notes}</p>}
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t">
                <Dialog open={isAddPartModalOpen} onOpenChange={setIsAddPartModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full h-9" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Outra Peça
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Adicionar Peça</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="part-name" className="text-sm font-medium">
                          Nome da Peça *
                        </Label>
                        <Input
                          id="part-name"
                          placeholder="Ex: Pastilha de freio dianteira"
                          value={newPart.name}
                          onChange={(e) => setNewPart((p) => ({ ...p, name: e.target.value }))}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="part-quantity" className="text-sm font-medium">
                            Quantidade
                          </Label>
                          <Input
                            id="part-quantity"
                            type="number"
                            min="1"
                            value={newPart.quantity}
                            onChange={(e) => setNewPart((p) => ({ ...p, quantity: parseInt(e.target.value) || 1 }))}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="part-price" className="text-sm font-medium">
                            Preço Estimado (R$)
                          </Label>
                          <Input
                            id="part-price"
                            type="number"
                            step="0.01"
                            placeholder="0,00"
                            value={newPart.estimatedPrice}
                            onChange={(e) => setNewPart((p) => ({ ...p, estimatedPrice: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="part-notes" className="text-sm font-medium">
                          Observações
                        </Label>
                        <Textarea
                          id="part-notes"
                          placeholder="Observações sobre a peça..."
                          rows={2}
                          value={newPart.notes}
                          onChange={(e) => setNewPart((p) => ({ ...p, notes: e.target.value }))}
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button variant="outline" onClick={() => setIsAddPartModalOpen(false)} className="flex-1">
                          Cancelar
                        </Button>
                        <Button onClick={handleAddPart} className="flex-1">
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        )}

        {parts.length === 0 && (
          <Card>
            <CardContent className="pt-6 pb-4">
              <Dialog open={isAddPartModalOpen} onOpenChange={setIsAddPartModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full h-11">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Peça
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Adicionar Peça</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="part-name2" className="text-sm font-medium">
                        Nome da Peça *
                      </Label>
                      <Input
                        id="part-name2"
                        placeholder="Ex: Pastilha de freio dianteira"
                        value={newPart.name}
                        onChange={(e) => setNewPart((p) => ({ ...p, name: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="part-quantity2" className="text-sm font-medium">
                          Quantidade
                        </Label>
                        <Input
                          id="part-quantity2"
                          type="number"
                          min="1"
                          value={newPart.quantity}
                          onChange={(e) => setNewPart((p) => ({ ...p, quantity: parseInt(e.target.value) || 1 }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="part-price2" className="text-sm font-medium">
                          Preço Estimado (R$)
                        </Label>
                        <Input
                          id="part-price2"
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          value={newPart.estimatedPrice}
                          onChange={(e) => setNewPart((p) => ({ ...p, estimatedPrice: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="part-notes2" className="text-sm font-medium">
                        Observações
                      </Label>
                      <Textarea
                        id="part-notes2"
                        placeholder="Observações sobre a peça..."
                        rows={2}
                        value={newPart.notes}
                        onChange={(e) => setNewPart((p) => ({ ...p, notes: e.target.value }))}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button variant="outline" onClick={() => setIsAddPartModalOpen(false)} className="flex-1">
                        Cancelar
                      </Button>
                      <Button onClick={handleAddPart} className="flex-1">
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Observações</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Textarea
              placeholder="Adicione observações sobre a execução do checklist..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="text-sm resize-none"
            />
          </CardContent>
        </Card>
      </div>

      {/* Ações fixas */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t p-4">
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/workshop/checklists")} className="flex-1 h-11">
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button
            onClick={handleComplete}
            className="flex-1 h-11"
            disabled={completedRequired < requiredItems.length}
          >
            <Check className="h-4 w-4 mr-2" />
            Finalizar
          </Button>
        </div>
      </div>

      {/* Modal de conclusão — sem <p> dentro de <p> */}
      <AlertDialog open={isFinishModalOpen} onOpenChange={setIsFinishModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Checklist Concluído!</AlertDialogTitle>

            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <span className="text-sm block">
                  O checklist “{checklist?.title}” foi finalizado com sucesso.
                </span>

                {parts.length > 0 && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900 mb-2">
                      Foram identificadas {parts.length} peça(s) que precisam ser trocadas:
                    </p>
                    <ul className="text-sm text-blue-800 space-y-1">
                      {parts.map((part) => (
                        <li key={part.id}>
                          • {part.name} (Qtd: {part.quantity})
                          {part.estimatedPrice && ` - R$ ${part.estimatedPrice.toFixed(2)}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <span className="text-sm block">
                  {parts.length > 0
                    ? "Deseja criar um orçamento com essas peças?"
                    : "O que deseja fazer agora?"}
                </span>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel onClick={handleFinishWithoutQuote}>
              {parts.length > 0 ? "Apenas Finalizar" : "Voltar aos Checklists"}
            </AlertDialogCancel>
            {parts.length > 0 && (
              <AlertDialogAction onClick={handleFinishWithQuote}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Criar Orçamento
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ChecklistExecution;
