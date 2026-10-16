"use client";
import { useEffect, useState } from 'react';

export type Category = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
  menu_order?: number;
  image: { src: string; alt: string } | null;
};

export type CategoryNode = Category & { children: Category[] };

// Kategorije se učitavaju jednom po poseti i dele između headera, početne i shopa
let cache: Promise<Category[]> | null = null;

function loadCategories(): Promise<Category[]> {
  if (!cache) {
    cache = fetch(`/api/wc/products/categories?per_page=100&hide_empty=true`)
      .then(res => res.json())
      .then((data: Category[]) => {
        if (!Array.isArray(data)) throw new Error('categories');
        return data
          .filter(c => c.count > 0 && c.slug !== 'uncategorized')
          .map(c => ({ ...c, name: decodeEntities(c.name) }));
      })
      .catch(() => { cache = null; return []; });
  }
  return cache;
}

function decodeEntities(s: string) {
  return s.replace(/&amp;/g, '&').replace(/&#0?38;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'");
}

const byOrder = (a: Category, b: Category) =>
  (a.menu_order ?? 0) - (b.menu_order ?? 0) || a.name.localeCompare(b.name, 'sr');

/** Glavne kategorije sa podkategorijama, sortirane po redosledu iz WooCommerce-a pa po nazivu */
export function buildTree(categories: Category[]): CategoryNode[] {
  return categories
    .filter(c => c.parent === 0 || !categories.some(p => p.id === c.parent))
    .sort(byOrder)
    .map(c => ({ ...c, children: categories.filter(ch => ch.parent === c.id).sort(byOrder) }));
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    loadCategories().then(data => {
      if (!alive) return;
      setCategories(data);
      setLoading(false);
    });
    return () => { alive = false; };
  }, []);

  return { categories, tree: buildTree(categories), loading };
}
