import { Vod } from "../models/vods.js"
import { Comment } from "../models/comments.js"

function index(req, res){
  Vod.find({})
  .then(vods => {
    res.render('vods/index', {
      vods,
      title: 'Explore',
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function login(req, res){
  res.render('vods/login', {
    Vod,
    title: "Login to ClipReel"
  })
}

function show(req, res){
  Vod.findById(req.params.vodId)
  .populate('owner')
  .populate('comments')
  .then(vod => {
    Comment.find({_id: {$nin: vod.comments}})
    .then(comments => {
      res.render('vods/show', {
        vod,
        comments,
        title: vod.title,
      })
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function newVod(req, res){
  res.render('vods/new', {
    title: 'Upload VOD'
  })
}

function create(req, res){
  console.log("ping for create")
  req.body.owner = req.user.profile._id
  Vod.create(req.body)
  .then(vod => {
    res.redirect(`/vods`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function edit(req, res){
  Vod.findById(req.params.vodId)
  .then(vod => {
    res.render('vods/edit', {
      vod,
      title: `Edit VOD`
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function update(req, res){
  Vod.findByIdAndUpdate(req.params.vodId, req.body)
  .then(vod => {
    res.redirect(`/vods/${vod._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function deleteVod(req, res){
  Vod.findByIdAndDelete(req.params.vodId)
  .then(vod => {
    res.redirect('/vods')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

function newComment(req, res){
  Vod.findById(req.params.vodId)
  .then(vod => {
    console.log(req.body.commentId)
    vod.comments.push(req.body.commentId)
    vod.save()
    .then(() => {
      console.log("pass for vod save")
      res.redirect(`/vods/${vod._id}`)
    })
    .catch(error => {
      console.log("error for vod save")
      console.log(error)
      res.redirect('/')
    })
  })
  .catch(error => {
    console.log("error for mewComment")
    console.log(error)
    res.redirect('/')
  })
}

function deleteComment(req, res){
  Vod.findById(req.params.vodId)
  .then(vod => {
    vod.comments.remove(req.params.vodId)
    vod.save()
    .then(() => {
      res.redirect(`/vods/${vod._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect('/')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/')
  })
}

export {
  index,
  login,
  show,
  newVod as new,
  deleteVod as delete,
  create,
  edit,
  update,
  newComment,
  deleteComment,
}