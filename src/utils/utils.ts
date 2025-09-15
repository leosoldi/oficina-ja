export function getIniciais(nome: String) {
  const palavras = nome.trim().split(/\s+/); // separa por espaços
  const primeira = palavras[0]?.charAt(0) || '';
  const ultima = palavras[palavras.length - 1]?.charAt(0) || '';
  return (primeira + ultima).toUpperCase();
}


export function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, "").slice(0, 11); // remove tudo que não é número, limita a 11 dígitos

  const part1 = cleaned.slice(0, 2); // DDD
  const part2 = cleaned.slice(2, 3); // 9
  const part3 = cleaned.slice(3, 7); // XXXX
  const part4 = cleaned.slice(7, 11); // XXXX

  if (cleaned.length <= 2) return `(${part1}`;
  if (cleaned.length <= 3) return `(${part1}) ${part2}`;
  if (cleaned.length <= 7) return `(${part1}) ${part2} ${part3}`;
  return `(${part1}) ${part2} ${part3}-${part4}`;
}
