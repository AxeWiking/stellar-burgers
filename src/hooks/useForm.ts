import { useState, ChangeEvent } from 'react';

type FormData = { errorText: string | null } | { [key: string]: string };

export function useForm<T extends FormData>(
  baseForm: T
): [T, (e: ChangeEvent<HTMLInputElement>) => void] {
  const [form, setForm] = useState<T>(baseForm);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const element = e.target;
    setForm((pastForm) => ({ ...pastForm, [element.name]: element.value }));
  }

  return [form, handleChange];
}
