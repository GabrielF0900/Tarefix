//Todo component for a button with a loading state

type Props = React.ComponentProps<"button"> & {
    name: string;}


export function Button({name}: {name:string}) {
    return <button>{name}</button>
    
}