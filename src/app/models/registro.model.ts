
export class Registro{
    public format:string;
    public texto:string;
    public type:string;
    public icon:string;
    public created:Date;

    constructor(format:string, texto:string){
        this.format = format
        this.texto = texto
        this.created = new Date()
        this.determinarTipo()
    }

    private determinarTipo(){
        const inicioTexto = this.texto.substr(0,4)
        console.log("tipo", inicioTexto)
        
        switch (inicioTexto) {
            case "http":
                this.type="pagina web"
                this.icon = "globe"
                break;
            case "geo:":
                this.type="geo"
                this.icon = "pin"
                break;
        
            default:
                this.type="No reconocido"
                this.icon ="create"
                break;
        }
    }
}