export class DetailVente {
    id: number = 0;
    vente_id: number = 0;
    produit_id: number = 0;
    quantite: number = 1;
    prix_unitaire: number = 0;
    sous_total: number = 0;
    created_at: Date = new Date();
    updated_at: Date = new Date();

    constructor(data?: Partial<DetailVente>) {
        if (data) {
            this.id = data.id ?? this.id;
            this.vente_id = data.vente_id ?? this.vente_id;
            this.produit_id = data.produit_id ?? this.produit_id;
            this.quantite = data.quantite ?? this.quantite;
            this.prix_unitaire = data.prix_unitaire ?? this.prix_unitaire;
            this.sous_total = data.sous_total ?? this.sous_total;
            this.created_at = data.created_at ?? this.created_at;
            this.updated_at = data.updated_at ?? this.updated_at;
        }
    }
}
