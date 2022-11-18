namespace SpriteKind {
    export const C49bomb = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    info.startCountdown(5)
})
sprites.onOverlap(SpriteKind.C49bomb, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate)
    info.changeScoreBy(10)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . f 1 1 f . . 
        1 2 1 f f 1 2 1 
        1 2 f f f f 2 1 
        1 2 2 2 2 2 2 1 
        1 . . 5 8 . . 1 
        1 . . 9 1 . . 1 
        1 . . 4 d . . 1 
        2 2 2 2 2 2 2 2 
        `, ship, 0, -140)
    projectile.startEffect(effects.fountain, 100)
    music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 5000, 1238, 186, 0, 250, SoundExpressionEffect.Warble, InterpolationCurve.Logarithmic), SoundExpressionPlayMode.UntilDone)
})
info.onCountdownEnd(function () {
    C49_Bomb = sprites.createProjectileFromSprite(img`
        ......ff1ff11ff1ff......
        .....f111111111111f.....
        ..ffffffffffffffffffff..
        ..fddddddddddddddddddf..
        ..fdfddfddfddfddfddfdf..
        ..fddddddddddddddddddf..
        ..ffffffffffffffffffff..
        .....fddddddddddddf.....
        .....fddddddddddddf.....
        .....f5555ffff5555f.....
        .....f555ffffff555f.....
        .....f55f5ffff5f55f.....
        .....ffff5ffff5ffff.....
        .....ffffffffffffff.....
        .....f555555555555f.....
        .....ffffffffffffff.....
        .....f555555555555f.....
        .....f55fffffffff5f.....
        .....f55f55f555555f.....
        .....f55f55f555555f.....
        .....f55ffff555555f.....
        .....f555555555555f.....
        .....f555555555555f.....
        .....f555555555555f.....
        .....f555555555555f.....
        .....f55fffffffff5f.....
        .....f555555f55555f.....
        .....f555555f55555f.....
        .....f555555f55555f.....
        .....f55fffff55555f.....
        .....f555555555555f.....
        .....f555555555555f.....
        .....f555555555555f.....
        .....f5f5555555f55f.....
        .....f5f5555555f55f.....
        .....f5f5555555f55f.....
        .....f55fffffff555f.....
        .....f555555555555f.....
        .....f555555555555f.....
        .....ffffffffffffff.....
        .....ffffffffffffff.....
        .....ffffffffffffff.....
        .....f5f55f55f55f5f.....
        .....f5f55f55f55f5f.....
        .....f5f55f55f55f5f.....
        .....f5f55f55f55f5f.....
        .....fddddddddddddf.....
        .....fddddddddddddf.....
        ..ffffffffffffffffffff..
        ..fddddddddddddddddddf..
        ..fdfddfddfddfddfddfdf..
        ..fddddddddddddddddddf..
        ..ffffffffffffffffffff..
        ........................
        ........................
        ........................
        `, ship, 0, -140)
    C49_Bomb.startEffect(effects.coolRadial, 100)
    info.startCountdown(10)
})
info.onScore(10, function () {
    info.changeScoreBy(5)
    info.setLife(5)
})
info.onScore(100, function () {
    game.splash("Congrats You Beat the Game!")
    game.over(true, effects.confetti)
})
info.onScore(22, function () {
    info.changeScoreBy(10)
    info.setLife(4)
})
info.onScore(55, function () {
    info.changeScoreBy(20)
    info.setLife(3)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(10, 500)
    otherSprite.destroy(effects.disintegrate)
    sprite.startEffect(effects.fire, 200)
    info.changeLifeBy(-1)
})
let C49_Bomb: Sprite = null
let projectile: Sprite = null
let ship: Sprite = null
game.setDialogFrame(img`
    ..bbbbbbbbbbbbbbbbbbbb..
    .bd111111111111111111db.
    bd1dbbbbbbbbbbbbbbbbd1db
    b1dbbbbbbbbbbbbbbbbbbd1b
    b1bd1111111111111111db1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1b111111111111111111b1b
    b1bd1111111111111111db1b
    bd1bbbbbbbbbbbbbbbbbb1db
    bbd111111111111111111dbb
    .bbbbbbbbbbbbbbbbbbbbbb.
    ..bbbbbbbbbbbbbbbbbbbb..
    `)
game.setDialogTextColor(8)
game.showLongText("Welcome Space Cadet, your job is avoid the astroids click B to deploy c49 bombs , use these sparingly you only get one every 10 seconds but you can deploy bullets at will using A. ", DialogLayout.Full)
game.splash(game.askForNumber("What is your Favorite #?", 1), "The above number is your space agent # ")
ship = sprites.create(sprites.kaiju.kaijuBabyLarge, SpriteKind.Player)
ship.setStayInScreen(true)
ship.bottom = 120
controller.moveSprite(ship, 100, 100)
info.setLife(8)
effects.starField.startScreenEffect()
game.onUpdateInterval(500, function () {
    let asteroids: Image[] = []
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
