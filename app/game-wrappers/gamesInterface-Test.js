import GamesInterface from './gamesInterface';

describe('gamesInterface', function () {
  it('should pass', () => {
    let i = new GamesInterface();
    expect(i).to.be.an.instanceof(GamesInterface);
    console.log('bingo');
  });
});