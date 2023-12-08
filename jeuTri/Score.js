export default class Score 
{
    constructor()
    {
        this.score = 0;
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



}