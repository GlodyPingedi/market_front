export class Categorie {
    id: number = 0;
    nom: string = '';
    description: string = '';
    created_at: Date = new Date();
    updated_at: Date = new Date();

    constructor(data?: Partial<Categorie>) {
        if (data) {
            this.id = data.id ?? this.id;
            this.nom = data.nom ?? this.nom;
            this.description = data.description ?? this.description;
            this.created_at = data.created_at ?? this.created_at;
            this.updated_at = data.updated_at ?? this.updated_at;
        }
    }
}
