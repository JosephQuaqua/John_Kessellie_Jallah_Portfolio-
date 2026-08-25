import { type ReactNode } from 'react';
import { Plus, Search, Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  onAdd?: () => void;
  addLabel?: string;
  backLink?: string;
}

export function AdminPageHeader({ title, description, onAdd, addLabel = 'Add New', backLink }: AdminPageHeaderProps) {
  return (
    <div className="mb-6">
      {backLink && (
        <a href={backLink} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-accent-600 mb-2 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </a>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-navy-900">{title}</h1>
          {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
        </div>
        {onAdd && (
          <Button onClick={onAdd} size="md">
            <Plus className="h-4 w-4" /> {addLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

interface AdminSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function AdminSearchBar({ value, onChange, placeholder = 'Search...' }: AdminSearchBarProps) {
  return (
    <div className="relative mb-4 max-w-sm">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}

interface DataTableProps {
  columns: string[];
  children: ReactNode;
}

export function DataTable({ columns, children }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-soft">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            {columns.map((col) => (
              <th key={col} className="text-left text-xs font-bold uppercase tracking-wider text-slate-500 px-4 py-3.5">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">{children}</tbody>
      </table>
    </div>
  );
}

interface TableRowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function TableRowActions({ onEdit, onDelete }: TableRowActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onEdit}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-accent-600 hover:bg-accent-50 transition-colors"
        aria-label="Edit"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        onClick={onDelete}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        aria-label="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

interface StatusBadgeProps {
  published: boolean;
}

export function StatusBadge({ published }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1',
        published ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', published ? 'bg-emerald-500' : 'bg-slate-400')} />
      {published ? 'Published' : 'Draft'}
    </span>
  );
}

interface ConfirmDeleteProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export function ConfirmDelete({ open, onClose, onConfirm, title = 'Confirm Delete', message = 'Are you sure you want to delete this item? This action cannot be undone.' }: ConfirmDeleteProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-slate-600">{message}</p>
      <div className="mt-6 flex items-center justify-end gap-3">
        <Button variant="outline" size="md" onClick={onClose}>Cancel</Button>
        <Button variant="danger" size="md" onClick={onConfirm}>Delete</Button>
      </div>
    </Modal>
  );
}
