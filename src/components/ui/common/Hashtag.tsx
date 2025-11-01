export default function HashTag(props: { text: string }) {
  return (
    <span className="text-sm text-secondary bg-button-background rounded-full px-2 font-semibold">
      # {props.text}
    </span>
  );
}
