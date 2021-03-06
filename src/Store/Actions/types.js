// Action type definition.
export const VIDEOSTREAM = {
  CAMERA_TOGGLE: "VIDEOSTREAM_CAMERA_TOGGLE",
  VIDEO_TOGGLE: "VIDEOSTREAM_VIDEO_TOGGLE",
  MIRROR_TOGGLE: "VIDEOSTREAM_MIRROR_TOGGLE",
  FULLSCREEN_TOGGLE: "VIDEOSTREAM_FULLSCREEN_TOGGLE",
  FACINGMODE_UPDATE: "VIDEOSTREAM_FACINGMODE_UPDATE",
  FRAMERATE_UPDATE: "VIDEOSTREAM_FRAMERATE_UPDATE",
}

export const POSEESTIMATION = {
  SKELETON_TOGGLE: "POSEESTIMATION_SKELETON_TOGGLE",
  FLIPHORIZONTAL_TOGGLE: "POSEESTIMATION_FLIPHORIZONTAL_TOGGLE",
  DETECTIONTYPE_UPDATE: "POSEESTIMATION_DETECTIONTYPE_UPDATE",
  IMAGESCALEFACTOR_UPDATE: "POSEESTIMATION_IMAGESCALEFACTOR_UPDATE",
  COLOR_UPDATE: "POSEESTIMATION_COLOR_UPDATE",
  OUTPUTSTRIDE_UPDATE: "POSEESTIMATION_OUTPUTSTRIDE_UPDATE",
  MINCONFIDENCE_UPDATE: "POSEESTIMATION_MINCONFIDENCE_UPDATE",
  MAXPOSEDETECTIONS_UPDATE: "POSEESTIMATION_MAXPOSEDETECTIONS_UPDATE",
  SCORETHRESHOLD_UPDATE: "POSEESTIMATION_SCORETHRESHOLD_UPDATE",
  NMSRADIUS_UPDATE: "POSEESTIMATION_NMSRADIUS_UPDATE",
  MULTIPLIER_UPDATE: "POSEESTIMATION_MULTIPLIER_UPDATE",
}

export const SOUNDMAPPING = {
  MODE_UPDATE: "SOUNDMAPPING_MODE_UPDATE",
  SYNTHCOMP_TRANSPORT_TOGGLE: "SOUNDMAPPING_SYNTHCOMP_TRANSPORT_TOGGLE",
  SYNTHCOMP_LOWPASS_UPDATE: "SOUNDMAPPING_SYNTHCOMP_LOWPASS_UPDATE",
  SYNTHCOMP_AUTOWAHQ_UPDATE: "SOUNDMAPPING_SYNTHCOMP_AUTOWAHQ_UPDATE",
  SYNTHCOMP_VIBRATODEPTH_UPDATE: "SOUNDMAPPING_SYNTHCOMP_VIBRATODEPTH_UPDATE",
  SYNTHCOMP_PHASEROCTAVE_UPDATE: "SOUNDMAPPING_SYNTHCOMP_PHASEROCTAVE_UPDATE",
  SYNTHCOMP_PHASERBASEFREQUENCY_UPDATE:
    "SOUNDMAPPING_SYNTHCOMP_PHASERBASEFREQUENCY_UPDATE",
}
