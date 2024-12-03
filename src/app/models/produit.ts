export class Produit {
    id: number = 0;
    nom: string = '';
    description: string = '';
    prix_unitaire: number = 0;
    stock_disponible: number = 0;
    code_barre: string = '';
    categorie_id: number | null = null;
    created_at: Date = new Date();
    updated_at: Date = new Date();

    constructor(data?: Partial<Produit>) {
        if (data) {
            this.id = data.id ?? this.id;
            this.nom = data.nom ?? this.nom;
            this.description = data.description ?? this.description;
            this.prix_unitaire = data.prix_unitaire ?? this.prix_unitaire;
            this.stock_disponible = data.stock_disponible ?? this.stock_disponible;
            this.code_barre = data.code_barre ?? this.code_barre;
            this.categorie_id = data.categorie_id ?? this.categorie_id;
            this.created_at = data.created_at ?? this.created_at;
            this.updated_at = data.updated_at ?? this.updated_at;
        }
    }
}
