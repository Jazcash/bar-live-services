import { UserCreationAttributes, UserInstance } from "common/model/user";
import { BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, Model, Optional } from "sequelize/types";

export interface Alias {
    id: number;
    alias: string;
}

export interface AliasCreationAttributes extends Optional<Alias, "id"> { }

export interface AliasInstance extends Model<Alias, AliasCreationAttributes>, Alias {
    getUser: BelongsToGetAssociationMixin<UserInstance>;
    setUser: BelongsToSetAssociationMixin<UserInstance, UserInstance["id"]>;
    createUser: (user: UserCreationAttributes) => Promise<UserInstance>;
}