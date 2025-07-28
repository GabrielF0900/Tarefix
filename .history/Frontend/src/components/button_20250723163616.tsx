//Todo component for a button with a loading state

type Props = React.ComponentProps<"button"> & {
    name: string;}


export function Button({name}: Props) {
    return <button>{name}</button>
    
}