/**
 * @typedef {Object} StepData
 * @property {number} id
 * @property {string} title
 * @property {string} location
 * @property {string} target
 * @property {string} story
 * @property {string} answer
 * @property {string} hint
 */

/** @type {StepData[]} */
export const stepData = [
  {
    id: 1,
    title: '始まりの1921',
    location: '吉田観賞魚 創業の碑',
    target: '創業の石碑',
    story: 'この庭園が生まれた年を探せ。現地の石碑をARスキャンして、年号を入力してください。',
    answer: '1921',
    hint: '石碑に刻まれた「大正10年」を西暦に変換してみましょう。',
  },
  {
    id: 2,
    title: '黄金の主の秘密',
    location: '吉田観賞魚 錦鯉の池',
    target: '池の看板',
    story: '池の看板をARスキャンし、赤い文字を順番に読んで答えを入力してください。',
    answer: 'キンギョ',
    hint: '看板の赤い文字だけを拾って読むのがポイントです。',
  },
  {
    id: 3,
    title: '大地の実り',
    location: 'ガーデンズマルシェ',
    target: '生産者パネル',
    story: '地産野菜コーナーの生産者パネルをARスキャンし、現れた言葉を入力してください。',
    answer: 'オコジュ',
    hint: '「一休み」を意味する多摩の方言です。',
  },
]
