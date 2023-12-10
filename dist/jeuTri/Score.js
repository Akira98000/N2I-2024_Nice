export default class Score 
{
    constructor()
    {
        this.score = 0;
        this.raison = "";
    }

    increment(score)
    {
        this.score += score;
    }

    decrement(score)
    {
        this.score -= score;
    }

    getScore()
    {
        return this.score;
    }

    reset()
    {
        this.score = 0;
    }

    setRaison(raison)
    {
        this.raison = raison;
    }

    getRaison()
    {
        return this.raison;
    }



}