interface IDelivery {
	id: string;
	item_name: string;
	id_client: string;
	id_deliveryman?: string | null;
	created_at: Date;
	end_at?: Date | null;
}

export { IDelivery };
