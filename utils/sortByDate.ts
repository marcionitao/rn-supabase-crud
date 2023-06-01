import { ToDo } from '../src/@types/navigation';

export default function sortByDate(arr: ToDo[]) {
  // ordenar da data mais recente a mais antiga
  arr.sort((a, b) => {
    return Number(new Date(b.created_at)) - Number(new Date(a.created_at));
  });

  return arr;
}
