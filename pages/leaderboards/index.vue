<template>
    <div>
        <h1 class="page-title">
            Leaderboards
        </h1>
        <div class="disclaimer text-center">
            <p>See <a href="https://www.beyondallreason.info/guide/rating-and-lobby-balance" target="_parent">here</a> to learn about the rating system.</p>
        </div>
        <div class="full-width flex-row">
            <a class="json-api flex-right" target="_blank" :href="`${$axios.defaults.baseURL}/leaderboards`">
                <v-icon size="22">mdi-code-braces</v-icon>
            </a>
        </div>
        <div class="leaderboards">
            <div v-for="(leaderboard, name) in leaderboards" :key="name" class="leaderboard">
                <h2>{{ name }}</h2>
                <div class="leaderboard-row leaderboard-row--header">
                    <div class="leaderboard-row__rank">
                        Rank
                    </div>
                    <div class="leaderboard-row__name">
                        Name
                    </div>
                    <div class="leaderboard-row__trueskill">
                        OpenSkill
                    </div>
                </div>
                <div v-for="(player, index) in leaderboard" :key="index" class="leaderboard-row">
                    <div class="leaderboard-row__rank">
                        {{ index + 1 }}
                    </div>
                    <div class="leaderboard-row__name">
                        {{ player.name }}
                    </div>
                    <div class="leaderboard-row__trueskill">
                        {{ player.rating.toFixed(2) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types/app";
import { Component, Vue } from "nuxt-property-decorator";
import { Leaderboards } from "bar-db/dist/model/rest-api/leaderboards";

@Component({
    head: { title: "BAR - Leaderboards" }
})
export default class Page extends Vue {
    async asyncData({ store, $axios, params }: Context): Promise<any> {
        const leaderboards = await $axios.$get("leaderboards") as Leaderboards;
        return { leaderboards };
    }
}
</script>

<style lang="scss" scoped>
.leaderboards {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    @media screen and (max-width: 900px) {
        flex-wrap: wrap;
    }
}
.leaderboard {
    width: 100%;
    padding-bottom: 5px;
}
h2 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 28px;
    text-transform: uppercase;
}
.leaderboard-row {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    font-weight: 500;
    padding: 6px 5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    &--header{
        font-size: 12px;
        font-weight: 400;
        background: none;
    }
    &__rank{
        width: 15%;
    }
    &__name{
        width: 65%;
        display: flex;
    }
    &__trueskill{
        width: 20%;
    }
    &:nth-child(odd){
        background: rgba(255, 255, 255, 0.08);
    }
    &:nth-child(3) .leaderboard-row__name {
        &:after{
            margin-left: 5px;
            font-size: 14px;
            content: "🏆";
        }
    }
}
.disclaimer {
    a {
        text-decoration: underline;
    }
}
</style>
