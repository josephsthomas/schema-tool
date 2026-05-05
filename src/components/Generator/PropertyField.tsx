import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { classifyRange, type FieldKind } from '@/lib/range-classify';
import type { FieldValue } from '@/lib/jsonld-build';
import { emptyFieldValueFor } from '@/lib/jsonld-build';
import { bareName } from '@/lib/utils';
import type { SchemaProperty, SchemaTerm } from '@/types/schema-org';

interface PropertyFieldProps {
  property: SchemaProperty;
  termsById: Record<string, SchemaTerm>;
  value: FieldValue | undefined;
  onChange: (next: FieldValue) => void;
  status?: 'required' | 'recommended';
}

export function PropertyField({ property, termsById, value, onChange, status }: PropertyFieldProps) {
  const kind = classifyRange(property.rangeIncludes, termsById);
  const id = useId();
  const propName = bareName(property.id);
  const current = value ?? emptyFieldValueFor(kind.kind);

  return (
    <div className="grid grid-cols-[180px_1fr] items-start gap-x-4 gap-y-1 py-3">
      <div className="pt-1.5">
        <Label htmlFor={id} className="text-sm font-medium">
          {propName}
        </Label>
        {status && (
          <Badge variant={status === 'required' ? 'default' : 'outline'} className="ml-2 text-[10px]">
            {status}
          </Badge>
        )}
        {property.description && (
          <p className="mt-0.5 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
            {property.description.length > 110
              ? property.description.slice(0, 110).trim() + '…'
              : property.description}
          </p>
        )}
      </div>
      <div className="min-w-0">
        <FieldWidget
          id={id}
          kind={kind}
          value={current}
          onChange={onChange}
          termsById={termsById}
        />
      </div>
    </div>
  );
}

interface FieldWidgetProps {
  id: string;
  kind: FieldKind;
  value: FieldValue;
  onChange: (next: FieldValue) => void;
  termsById: Record<string, SchemaTerm>;
}

function FieldWidget({ id, kind, value, onChange, termsById }: FieldWidgetProps) {
  switch (kind.kind) {
    case 'multiline':
      return (
        <Textarea
          id={id}
          rows={3}
          value={value.kind === 'text' ? value.value : ''}
          onChange={(e) => onChange({ kind: 'text', value: e.target.value })}
        />
      );
    case 'text':
      return (
        <Input
          id={id}
          type="text"
          value={value.kind === 'text' ? value.value : ''}
          onChange={(e) => onChange({ kind: 'text', value: e.target.value })}
        />
      );
    case 'url':
      return (
        <Input
          id={id}
          type="url"
          placeholder="https://"
          value={value.kind === 'url' ? value.value : ''}
          onChange={(e) => onChange({ kind: 'url', value: e.target.value })}
        />
      );
    case 'number':
    case 'integer':
      return (
        <Input
          id={id}
          type="number"
          step={kind.kind === 'integer' ? '1' : 'any'}
          value={value.kind === 'number' ? value.value : ''}
          onChange={(e) => onChange({ kind: 'number', value: e.target.value })}
        />
      );
    case 'boolean':
      return (
        <Checkbox
          id={id}
          checked={value.kind === 'boolean' ? value.value : false}
          onCheckedChange={(checked) => onChange({ kind: 'boolean', value: checked === true })}
        />
      );
    case 'date':
      return (
        <Input
          id={id}
          type="date"
          value={value.kind === 'date' ? value.value : ''}
          onChange={(e) => onChange({ kind: 'date', value: e.target.value })}
        />
      );
    case 'datetime':
      return (
        <Input
          id={id}
          type="datetime-local"
          value={value.kind === 'datetime' ? value.value : ''}
          onChange={(e) => onChange({ kind: 'datetime', value: e.target.value })}
        />
      );
    case 'time':
      return (
        <Input
          id={id}
          type="time"
          value={value.kind === 'time' ? value.value : ''}
          onChange={(e) => onChange({ kind: 'time', value: e.target.value })}
        />
      );
    case 'duration':
      return (
        <Input
          id={id}
          type="text"
          placeholder="ISO-8601 duration, e.g. PT30M"
          value={value.kind === 'duration' ? value.value : ''}
          onChange={(e) => onChange({ kind: 'duration', value: e.target.value })}
        />
      );
    case 'quantity': {
      const v = value.kind === 'quantity' ? value.value : { value: '', unit: '' };
      return (
        <div className="grid grid-cols-[1fr_120px] gap-2">
          <Input
            id={id}
            type="text"
            placeholder="value"
            value={v.value}
            onChange={(e) =>
              onChange({ kind: 'quantity', value: { ...v, value: e.target.value } })
            }
          />
          <Input
            type="text"
            placeholder="unit (e.g. mg)"
            value={v.unit}
            onChange={(e) =>
              onChange({ kind: 'quantity', value: { ...v, unit: e.target.value } })
            }
          />
        </div>
      );
    }
    case 'enumeration': {
      const enumeration = termsById[kind.enumerationId];
      if (!enumeration || enumeration.kind !== 'Enumeration') {
        return (
          <Input
            id={id}
            type="text"
            placeholder="enumeration value"
            value={value.kind === 'enumeration' ? value.value : ''}
            onChange={(e) => onChange({ kind: 'enumeration', value: e.target.value })}
          />
        );
      }
      const memberIds = enumeration.enumerationMembers ?? [];
      const selected = value.kind === 'enumeration' ? value.value : '';
      return (
        <Select
          id={id}
          value={selected}
          onChange={(e) => onChange({ kind: 'enumeration', value: e.target.value })}
        >
          <option value="">{`(pick a ${bareName(kind.enumerationId)} value)`}</option>
          {memberIds.map((mId) => {
            const m = termsById[mId];
            if (!m) return null;
            return (
              <option key={mId} value={mId}>
                {bareName(mId)}
              </option>
            );
          })}
        </Select>
      );
    }
    case 'nested': {
      const inner = value.kind === 'nested' ? value.value : { typeId: kind.typeIds[0], entries: {} };
      return (
        <NestedEntityField
          id={id}
          typeIds={kind.typeIds}
          inner={inner}
          termsById={termsById}
          onChange={(typeId, entries) =>
            onChange({ kind: 'nested', value: { typeId, entries } })
          }
        />
      );
    }
    case 'unknown':
      return (
        <Input
          id={id}
          type="text"
          placeholder={`Free text (range: ${kind.rangeIds.map(bareName).join(', ') || 'unknown'})`}
          value={value.kind === 'text' ? value.value : ''}
          onChange={(e) => onChange({ kind: 'text', value: e.target.value })}
        />
      );
    default: {
      const _exhaustive: never = kind;
      void _exhaustive;
      return null;
    }
  }
}

function NestedEntityField({
  id,
  typeIds,
  inner,
  termsById,
  onChange,
}: {
  id: string;
  typeIds: string[];
  inner: { typeId: string; entries: Record<string, FieldValue> };
  termsById: Record<string, SchemaTerm>;
  onChange: (typeId: string, entries: Record<string, FieldValue>) => void;
}) {
  const nameValue =
    inner.entries.name && inner.entries.name.kind === 'text' ? inner.entries.name.value : '';

  return (
    <div className="space-y-2 rounded-md border border-zinc-200 bg-zinc-50/40 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="grid grid-cols-[140px_1fr] gap-2">
        <Select
          value={inner.typeId}
          onChange={(e) => onChange(e.target.value, inner.entries)}
        >
          {typeIds.map((tId) => {
            const t = termsById[tId];
            if (!t) return null;
            return (
              <option key={tId} value={tId}>
                {bareName(tId)}
              </option>
            );
          })}
        </Select>
        <Input
          id={id}
          type="text"
          placeholder="name"
          value={nameValue}
          onChange={(e) =>
            onChange(inner.typeId, {
              ...inner.entries,
              name: { kind: 'text', value: e.target.value },
            })
          }
        />
      </div>
      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
        Compact embedded entity: @type + name. For full property fan-out, save the parent and
        compose in Workspace (Phase 6).
      </p>
    </div>
  );
}
