import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

/* ------------------------------------------------------------------ */
/* Accessible form field primitives: label + control + error message.  */
/* Errors are linked via aria-describedby and announced politely.      */
/* ------------------------------------------------------------------ */

const controlBase =
  'w-full rounded-btn border bg-surface px-3.5 text-body text-ink ' +
  'placeholder:text-ink-subtle transition-colors duration-200 ' +
  'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/35'

const controlBorder = (invalid?: boolean) =>
  invalid ? 'border-red-500/70' : 'border-line-strong'

interface FieldWrapperProps {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
}

export function FieldWrapper({
  id,
  label,
  required,
  error,
  hint,
  children,
}: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-small font-medium text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-red-700 dark:text-red-400">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-caption text-ink-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-caption font-medium text-red-700 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  error?: string
  hint?: string
}

export function TextInput({ id, label, error, hint, required, className = '', ...rest }: TextInputProps) {
  return (
    <FieldWrapper id={id} label={label} required={required} error={error} hint={hint}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${controlBase} ${controlBorder(!!error)} h-11 ${className}`.trim()}
        {...rest}
      />
    </FieldWrapper>
  )
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  error?: string
  hint?: string
  options: readonly { value: string; label: string }[]
  placeholder?: string
}

export function SelectInput({
  id,
  label,
  error,
  hint,
  required,
  options,
  placeholder,
  className = '',
  ...rest
}: SelectInputProps) {
  return (
    <FieldWrapper id={id} label={label} required={required} error={error} hint={hint}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${controlBase} ${controlBorder(!!error)} h-11 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%2374839e%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m4%206%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[right_0.75rem_center] bg-no-repeat pr-10 ${className}`.trim()}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
  error?: string
  hint?: string
}

export function TextArea({ id, label, error, hint, required, className = '', ...rest }: TextAreaProps) {
  return (
    <FieldWrapper id={id} label={label} required={required} error={error} hint={hint}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${controlBase} ${controlBorder(!!error)} min-h-32 py-2.5 ${className}`.trim()}
        {...rest}
      />
    </FieldWrapper>
  )
}
