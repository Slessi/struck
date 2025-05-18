interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:not-disabled:bg-blue-600 disabled:opacity-80 disabled:cursor-not-allowed active:not-disabled:bg-blue-700 transition-colors"
      {...props}
    />
  );
}
