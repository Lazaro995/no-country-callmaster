export type LinkProps = {
    nombre: string;
    redireccion: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    cssClass?: string
};