export namespace InstagramApiResponse {
  export interface root {
    num_results: number;
    more_available: boolean;
    items?: Item[];
    auto_load_more_enabled: boolean;
    status: string;
  }

  export interface Item {
    taken_at: number;
    pk: string;
    id: string;
    fbid: string;
    device_timestamp: number;
    caption_is_edited: boolean;
    strong_id__: string;
    deleted_reason: number;
    has_shared_to_fb: number;
    has_delayed_metadata: boolean;
    is_quiet_post: boolean;
    mezql_token: string;
    share_count_disabled: boolean;
    is_visual_reply_commenter_notice_enabled: boolean;
    like_and_view_counts_disabled: boolean;
    is_post_live_clips_media: boolean;
    comment_threading_enabled: boolean;
    is_unified_video: boolean;
    commerciality_status: string;
    client_cache_key: string;
    integrity_review_decision: string;
    should_request_ads: boolean;
    is_reshare_of_text_post_app_media_in_ig: boolean;
    has_privately_liked: boolean;
    filter_type: number;
    usertags: Usertags;
    photo_of_you: boolean;
    can_see_insights_as_brand: boolean;
    media_type: number;
    code: string;
    caption: Caption;
    sharing_friction_info: SharingFrictionInfo;
    original_media_has_visual_reply_media: boolean;
    fb_user_tags: FbUserTags;
    coauthor_producers: CoauthorProducer[];
    coauthor_producer_can_see_organic_insights: boolean;
    invited_coauthor_producers: Primitive[];
    is_in_profile_grid: boolean;
    profile_grid_control_enabled: boolean;
    user: User3;
    owner: Owner;
    image_versions2: ImageVersions2;
    video_versions?: VideoVersion[];  //aaaaaaaaaaaaaaaaaaaaaaaaa
    original_width: number;
    original_height: number;
    media_notes: MediaNotes;
    enable_media_notes_production: boolean;
    product_type: string;
    is_paid_partnership: boolean;
    music_metadata: MusicMetadata;
    organic_tracking_token: string;
    ig_media_sharing_disabled: boolean;
    boost_unavailable_identifier: Primitive;
    boost_unavailable_reason: Primitive;
    boost_unavailable_reason_v2: Primitive;
    subscribe_cta_visible: boolean;
    is_cutout_sticker_allowed: boolean;
    gen_ai_detection_method: GenAiDetectionMethod;
    fb_aggregated_like_count: number;
    fb_aggregated_comment_count: number;
    has_high_risk_gen_ai_inform_treatment: boolean;
    collab_follow_button_info: CollabFollowButtonInfo;
    open_carousel_show_follow_button: boolean;
    is_tagged_media_shared_to_viewer_profile_grid: boolean;
    should_show_author_pog_for_tagged_media_shared_to_profile_grid: boolean;
    is_eligible_for_media_note_recs_nux: boolean;
    should_open_collab_bottomsheet_on_facepile_tap: boolean;
    is_social_ufi_disabled: boolean;
    is_eligible_for_meta_ai_share: boolean;
    can_reply: boolean;
    can_view_more_preview_comments: boolean;
    preview_comments: Primitive[];
    comment_count: number;
    hide_view_all_comment_entrypoint: boolean;
    inline_composer_display_condition: string;
    is_comments_gif_composer_enabled: boolean;
    comment_inform_treatment: CommentInformTreatment;
    has_liked: boolean;
    like_count: number;
    facepile_top_likers: Primitive[];
    top_likers: Primitive[];
    clips_tab_pinned_user_ids: Primitive[];
    can_viewer_save: boolean;
    can_viewer_reshare: boolean;
    shop_routing_user_id: Primitive;
    is_organic_product_tagging_eligible: boolean;
    igbio_product: Primitive;
    featured_products: Primitive[];
    product_suggestions: Primitive[];
    open_carousel_submission_state: string;
    carousel_media_count?: number;
    carousel_media?: CarouselMedum[];
    carousel_media_pending_post_count?: number;
    is_reuse_allowed: boolean;
    has_more_comments: boolean;
    max_num_visible_preview_comments: number;
    explore_hide_comments: boolean;
    is_open_to_public_submission: boolean;
    carousel_media_ids: string[];
  }

  export interface Usertags {
    in: In[];
  }

  export interface In {
    duration_in_video_in_sec: Primitive;
    position: number[];
    start_time_in_video_in_sec: Primitive;
    user: User;
  }

  export interface User {
    pk: string;
    pk_id: string;
    id: string;
    full_name: string;
    is_private: boolean;
    strong_id__: string;
    username: string;
    is_verified: boolean;
    profile_pic_id: string;
    profile_pic_url: string;
  }

  export interface Caption {
    bit_flags: number;
    created_at: number;
    created_at_utc: number;
    did_report_as_spam: boolean;
    is_ranked_comment: boolean;
    pk: string;
    share_enabled: boolean;
    content_type: string;
    media_id: string;
    status: string;
    type: number;
    user_id: string;
    strong_id__: string;
    has_translation: boolean;
    text: string;
    user: User2;
    is_covered: boolean;
    private_reply_status: number;
  }

  export interface User2 {
    pk: string;
    pk_id: string;
    id: string;
    full_name: string;
    is_private: boolean;
    is_unpublished: boolean;
    strong_id__: string;
    fbid_v2: string;
    username: string;
    is_verified: boolean;
    profile_pic_id: string;
    profile_pic_url: string;
  }

  export interface SharingFrictionInfo {
    bloks_app_url: Primitive;
    should_have_sharing_friction: boolean;
    sharing_friction_payload: Primitive;
  }

  export interface FbUserTags {
    in: Primitive[];
  }

  export interface CoauthorProducer {
    pk: string;
    pk_id: string;
    id: string;
    full_name: string;
    is_private: boolean;
    strong_id__: string;
    username: string;
    is_verified: boolean;
    profile_pic_id: string;
    profile_pic_url: string;
  }

  export interface User3 {
    fbid_v2: string;
    feed_post_reshare_disabled: boolean;
    full_name: string;
    id: string;
    is_private: boolean;
    is_unpublished: boolean;
    pk: string;
    pk_id: string;
    show_account_transparency_details: boolean;
    strong_id__: string;
    third_party_downloads_enabled: number;
    account_type: number;
    account_badges: Primitive[];
    fan_club_info: FanClubInfo;
    friendship_status: FriendshipStatus;
    has_anonymous_profile_picture: boolean;
    hd_profile_pic_url_info: HdProfilePicUrlInfo;
    hd_profile_pic_versions: HdProfilePicVersion[];
    is_favorite: boolean;
    is_verified: boolean;
    profile_pic_id: string;
    profile_pic_url: string;
    transparency_product_enabled: boolean;
    username: string;
    latest_reel_media: number;
    can_see_quiet_post_attribution: boolean;
  }

  export interface FanClubInfo {
    autosave_to_exclusive_highlight: Primitive;
    connected_member_count: Primitive;
    fan_club_id: Primitive;
    fan_club_name: Primitive;
    has_enough_subscribers_for_ssc: Primitive;
    is_fan_club_gifting_eligible: Primitive;
    is_fan_club_referral_eligible: Primitive;
    subscriber_count: Primitive;
    fan_consideration_page_revamp_eligiblity: Primitive;
  }

  export interface FriendshipStatus {
    following: boolean;
    is_bestie: boolean;
    is_feed_favorite: boolean;
    is_restricted: boolean;
  }

  export interface HdProfilePicUrlInfo {
    height: number;
    url: string;
    width: number;
  }

  export interface HdProfilePicVersion {
    height: number;
    url: string;
    width: number;
  }

  export interface Owner {
    fbid_v2: string;
    feed_post_reshare_disabled: boolean;
    full_name: string;
    id: string;
    is_private: boolean;
    is_unpublished: boolean;
    pk: string;
    pk_id: string;
    show_account_transparency_details: boolean;
    strong_id__: string;
    third_party_downloads_enabled: number;
    account_type: number;
    account_badges: Primitive[];
    fan_club_info: FanClubInfo2;
    friendship_status: FriendshipStatus2;
    has_anonymous_profile_picture: boolean;
    hd_profile_pic_url_info: HdProfilePicUrlInfo2;
    hd_profile_pic_versions: HdProfilePicVersion2[];
    is_favorite: boolean;
    is_verified: boolean;
    profile_pic_id: string;
    profile_pic_url: string;
    transparency_product_enabled: boolean;
    username: string;
    latest_reel_media: number;
    can_see_quiet_post_attribution: boolean;
  }

  export interface FanClubInfo2 {
    autosave_to_exclusive_highlight: Primitive;
    connected_member_count: Primitive;
    fan_club_id: Primitive;
    fan_club_name: Primitive;
    has_enough_subscribers_for_ssc: Primitive;
    is_fan_club_gifting_eligible: Primitive;
    is_fan_club_referral_eligible: Primitive;
    subscriber_count: Primitive;
    fan_consideration_page_revamp_eligiblity: Primitive;
  }

  export interface FriendshipStatus2 {
    following: boolean;
    is_bestie: boolean;
    is_feed_favorite: boolean;
    is_restricted: boolean;
  }

  export interface HdProfilePicUrlInfo2 {
    height: number;
    url: string;
    width: number;
  }

  export interface HdProfilePicVersion2 {
    height: number;
    url: string;
    width: number;
  }

  export interface ImageVersions2 {
    candidates: Candidate[];
  }

  export interface Candidate {
    width: number;
    height: number;
    url: string;
    scans_profile?: string;
  }

  export interface MediaNotes {
    items: Primitive[];
  }

  export interface MusicMetadata {
    audio_type: Primitive;
    music_canonical_id: string;
    pinned_media_ids: Primitive;
    music_info: Primitive;
    original_sound_info: Primitive;
  }

  export interface GenAiDetectionMethod {
    detection_method: string;
  }

  export interface CollabFollowButtonInfo {
    show_follow_button: boolean;
    is_owner_in_author_exp: boolean;
  }

  export interface CommentInformTreatment {
    action_type: Primitive;
    should_have_inform_treatment: boolean;
    text: string;
    url: Primitive;
  }

  export interface CarouselMedum {
    id: string;
    explore_pivot_grid: boolean;
    carousel_parent_id: string;
    strong_id__: string;
    pk: string;
    commerciality_status: string;
    taken_at: number;
    product_type: string;
    media_type: number;
    accessibility_caption?: string;
    image_versions2: ImageVersions22;
    original_width: number;
    original_height: number;
    preview: string;
    usertags: Usertags2;
    featured_products: Primitive[];
    fb_user_tags: FbUserTags2;
    shop_routing_user_id: Primitive;
    sharing_friction_info: SharingFrictionInfo2;
    product_suggestions: Primitive[];
    video_versions?: VideoVersion[];
    video_duration?: number;
    has_audio?: boolean;
    is_dash_eligible?: number;
    video_dash_manifest?: string;
    number_of_qualities?: number;
  }

  export interface ImageVersions22 {
    candidates: Candidate2[];
    scrubber_spritesheet_info_candidates?: ScrubberSpritesheetInfoCandidates;
  }

  export interface Candidate2 {
    width: number;
    height: number;
    url: string;
  }

  export interface ScrubberSpritesheetInfoCandidates {
    default: Default;
  }

  export interface Default {
    video_length: number;
    thumbnail_width: number;
    thumbnail_height: number;
    thumbnail_duration: number;
    sprite_urls: string[];
    thumbnails_per_row: number;
    total_thumbnail_num_per_sprite: number;
    max_thumbnails_per_sprite: number;
    sprite_width: number;
    sprite_height: number;
    rendered_width: number;
    file_size_kb: number;
  }

  export interface Usertags2 {
    in: In2[];
  }

  export interface In2 {
    duration_in_video_in_sec: Primitive;
    position: number[];
    start_time_in_video_in_sec: Primitive;
    user: User4;
  }

  export interface User4 {
    pk: string;
    pk_id: string;
    id: string;
    full_name: string;
    is_private: boolean;
    strong_id__: string;
    username: string;
    is_verified: boolean;
    profile_pic_id: string;
    profile_pic_url: string;
  }

  export interface FbUserTags2 {
    in: Primitive[];
  }

  export interface SharingFrictionInfo2 {
    bloks_app_url: Primitive;
    should_have_sharing_friction: boolean;
    sharing_friction_payload: Primitive;
  }

  export interface VideoVersion {
    height: number;
    id: string;
    type: number;
    url: string;
    width: number;
  }
}
