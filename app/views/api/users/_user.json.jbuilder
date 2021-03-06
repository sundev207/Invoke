json.extract! user, :id, :username, :likes, :playlist_ids
json.avatar_url asset_path(user.avatar.url)
json.followernum  user.followers.count
json.followed_user_ids Follow.where(follower_id: user.id).map {|a| a.followee_id}
json.followingnum  user.followed_users.count
json.songnum user.songs.count
json.playlistnum user.playlists.count
#
# json.likes do
#   json.array! user.likes
# end
