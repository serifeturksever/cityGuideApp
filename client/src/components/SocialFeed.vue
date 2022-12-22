<template>
  <div class="ui feed">
    <div class="event">
      <div class="label">
        <img src="../assets/logo.png" />
      </div>
      <div class="content">
        <div class="summary">
          {{ author }} {{ summary }} | <i class="map pin icon"></i> {{ where }}
          <div class="date">
            {{ date }}
          </div>
        </div>
        <div class="extra text">
          {{ desc }}
        </div>
        <div class="extra images">
          <a><img :src="imgSrc"/></a>
        </div>
        <div class="meta">
          <a class="like"> <i class="like icon"></i> {{ likeCount }} Likes </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SocialFeed",
  props:{
    author:String, summary:String, where:{
      type:String,
      default:"🤫🤫"
    }, date:String, imgSrc:String, desc:String, likeCount:Number
  }
};
</script>
