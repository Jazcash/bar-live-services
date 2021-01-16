import { AllyTeamCreationAttributes, AllyTeamInstance } from "common/model/ally-team";
import { UserCreationAttributes, UserInstance } from "common/model/user";
import { BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, Model, Optional } from "sequelize";

export interface Spectator {
    id: number;
    playerId: number;
    name: string;
    countryCode: string;
    rank: number;
    skillUncertainty: number;
    skill: string;
}

export interface SpectatorCreationAttributes extends Optional<Spectator, "id"> { }

export interface SpectatorInstance extends Model<Spectator, SpectatorCreationAttributes>, Spectator {
    getAllyTeam: BelongsToGetAssociationMixin<AllyTeamInstance>;
    setAllyTeam: BelongsToSetAssociationMixin<AllyTeamInstance, AllyTeamInstance["id"]>;
    createAllyTeam: (allyTeam: AllyTeamCreationAttributes) => Promise<AllyTeamInstance>;

    getUser: BelongsToGetAssociationMixin<UserInstance>;
    setUser: BelongsToSetAssociationMixin<UserInstance, UserInstance["id"]>;
    createUser: (user: UserCreationAttributes) => Promise<UserInstance>;
}