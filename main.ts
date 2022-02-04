controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        5 5 5 5 8 . . . . 5 . . . . . . 
        . . . 5 5 5 5 5 5 8 5 2 2 8 8 5 
        . . . 5 5 5 5 5 5 8 5 2 2 8 8 5 
        5 5 5 5 8 . . . . 5 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpacePane, 200, 0)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    music.smallCrash.play()
    info.changeScoreBy(100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.bigCrash.play()
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let badguy: Sprite = null
let projectile: Sprite = null
let SpacePane: Sprite = null
SpacePane = sprites.create(img`
    . 1 1 1 1 1 1 . . . . . . . . . 
    . 1 1 1 1 1 1 7 7 . . . . . . . 
    . . 1 1 1 . . . . . . . . . . . 
    . . . . 1 1 1 5 1 1 1 a . . . . 
    . 2 8 8 1 1 1 1 5 . . . . . . . 
    5 2 8 8 8 1 1 1 1 . . . . . . . 
    . . . 1 1 1 a a a 1 1 1 1 1 . . 
    1 1 1 1 1 1 a 1 a 1 1 1 1 1 1 a 
    . . . 1 1 1 a a a 1 1 1 1 1 . . 
    5 2 8 8 8 1 a 1 1 . . . . . . . 
    . 2 8 8 1 1 a 1 5 . . . . . . . 
    . . . . 1 1 1 5 1 1 1 a . . . . 
    . . 1 1 1 . . . . . . . . . . . 
    . 1 1 1 1 1 1 7 7 . . . . . . . 
    . 1 1 1 1 1 1 . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(SpacePane, 200, 200)
SpacePane.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    badguy = sprites.create(img`
        . . . 2 . . . . . . . . 2 . . . 
        . . . . 2 . . 8 8 . . 2 . . . . 
        . . . . . 2 . 8 8 . 2 . . . . . 
        . . . 2 2 2 2 2 2 2 2 2 2 . . . 
        . 2 2 2 5 2 2 2 2 2 2 5 2 2 2 . 
        . 2 . 2 2 2 2 2 2 2 2 2 2 . 2 . 
        . 2 . . . . . 2 2 . . . . . 2 . 
        . 2 . 2 2 2 2 2 2 2 2 2 2 . 2 . 
        . 2 . 2 2 . . 2 2 . . 2 2 . 2 . 
        . 2 . 2 . . . 2 2 . . . 2 . 2 . 
        . 2 . 2 2 . . 8 8 . . 2 2 . 2 . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    badguy.setVelocity(-100, 0)
    badguy.setPosition(160, randint(5, 115))
    badguy.setFlag(SpriteFlag.AutoDestroy, true)
})
forever(function () {
    if (info.score() == 1000) {
        game.over(true)
    }
    music.playMelody("E C E D F C E D ", 120)
})
