import ReactMarkDown from "react-markdown";
interface MarkDownProps {
  children: string;
}

export default function MarkDown({ children }: MarkDownProps) {
  return (
    <ReactMarkDown
      className="space-y-3"
      components={{
        ul: (props) => <ul {...props} className="list-inside list-disc" />,
        a: (props)=> <a {...props} className="text-blue-500 underline" target="_blank" />
      }}
    >
      {children}
    </ReactMarkDown>
  );
}
