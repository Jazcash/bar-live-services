<template>
    <div>
        <h1 class="page-title">
            Battles
        </h1>
        <div v-if="battles && !battles.length" class="empty">
            No active battles 😞
        </div>
        <div v-else>
            <div class="players-online">
                There are currently <span class="player-count">{{ numOfPlayers }}</span> players in active battles.
            </div>
            <div class="battles">
                <Battle v-for="(battle, index) in battles" :key="index" :battle="battle" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types/app";
import { Component, Vue } from "nuxt-property-decorator";

import { Battle } from "~/model/battle";

@Component({
    head: { title: "BAR - Battles" }
})
export default class Page extends Vue {
    battles: Battle[] = [];
    pollInterval = 0;
    numOfPlayers = 0;

    async asyncData ({ $http }: Context): Promise<any> {
        const battles = await $http.$get("battles") as Battle[];
        return { battles };
    }

    async fetch () {
        try {
            this.battles = await this.$http.$get("battles") as Battle[];
            this.numOfPlayers = this.battles.reduce((total, battle) => total + battle.players.length, 0);
        } catch (err) {

        }
    }

    mounted () {
        this.pollInterval = window.setInterval(async () => {
            this.$fetch();
        }, 3000);
    }

    beforeDestroy () {
        window.clearInterval(this.pollInterval);
    }
}
</script>

<style lang="scss" scoped>
.empty {
    margin-top: 30px;
    font-size: 4vw;
    font-weight: 200;
    text-align: center;
}
.players-online {
    margin-bottom: 5px;
    text-align: center;
    .player-count {
        font-weight: 600;
    }
}
.battles {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: repeat(1, 1fr);
    @media (min-width: 700px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1900px) {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
