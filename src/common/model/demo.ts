import { AllyTeamCreationAttributes, AllyTeamInstance } from "common/model/ally-team";
import { SpectatorCreationAttributes, SpectatorInstance } from "common/model/spectator";
import { BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, Model } from "sequelize";

import { MapCreationAttributes, MapInstance } from "./map";

export interface Demo {
    id: string;
    fileName: string;
    engineVersion: string;
    gameVersion: string;
    startTime: Date;
    durationMs: number;
    fullDurationMs: number;
    hostSettings: { [key: string]: string };
    gameSettings: { [key: string]: string };
    mapSettings: { [key: string]: string };
}

export interface DemoCreationAttributes extends Demo { }

export interface DemoInstance extends Model<Demo, DemoCreationAttributes>, Demo {
    getMap: BelongsToGetAssociationMixin<MapInstance>;
    setMap: BelongsToSetAssociationMixin<MapInstance, MapInstance["id"]>;
    createMap: (map: MapCreationAttributes) => Promise<MapInstance>;

    getAllyTeams: HasManyGetAssociationsMixin<AllyTeamInstance>;
    setAllyTeams: HasManySetAssociationsMixin<AllyTeamInstance, AllyTeamInstance["id"]>;
    addAllyTeams: HasManyAddAssociationsMixin<AllyTeamInstance, AllyTeamInstance["id"]>;
    addAllyTeam: HasManyAddAssociationMixin<AllyTeamInstance, AllyTeamInstance["id"]>;
    createAllyTeam: (allyTeam: AllyTeamCreationAttributes) => Promise<AllyTeamInstance>;
    removeAllyTeam: HasManyRemoveAssociationMixin<AllyTeamInstance, AllyTeamInstance["id"]>;
    removeAllyTeams: HasManyRemoveAssociationsMixin<AllyTeamInstance, AllyTeamInstance["id"]>;
    hasAllyTeam: HasManyHasAssociationMixin<AllyTeamInstance, AllyTeamInstance["id"]>;
    hasAllyTeams: HasManyHasAssociationsMixin<AllyTeamInstance, AllyTeamInstance["id"]>;
    countAllyTeams: HasManyCountAssociationsMixin;

    getSpectators: HasManyGetAssociationsMixin<SpectatorInstance>;
    setSpectators: HasManySetAssociationsMixin<SpectatorInstance, SpectatorInstance["id"]>;
    addSpectators: HasManyAddAssociationsMixin<SpectatorInstance, SpectatorInstance["id"]>;
    addSpectator: HasManyAddAssociationMixin<SpectatorInstance, SpectatorInstance["id"]>;
    createSpectator: (spectator: SpectatorCreationAttributes) => Promise<SpectatorInstance>;
    removeSpectator: HasManyRemoveAssociationMixin<SpectatorInstance, SpectatorInstance["id"]>;
    removeSpectators: HasManyRemoveAssociationsMixin<SpectatorInstance, SpectatorInstance["id"]>;
    hasSpectator: HasManyHasAssociationMixin<SpectatorInstance, SpectatorInstance["id"]>;
    hasSpectators: HasManyHasAssociationsMixin<SpectatorInstance, SpectatorInstance["id"]>;
    countSpectators: HasManyCountAssociationsMixin;
}