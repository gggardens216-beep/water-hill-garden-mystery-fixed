/**
 * @typedef {Object} StepData
 * @property {number} id
 * @property {string} title
 * @property {string} location
 * @property {string} story
 * @property {string} answer
 * @property {string} hint
 */

/** @type {StepData[]} */
export const steps = [
  {
    id: 1,
    title: '始まりの1921',
    location: '吉田観賞魚創業の碑',
    story: 'この庭園が生まれた年を探せ。現地の石碑をスキャンして答えを入力してください。',
    answer: '1921',
    hint: '石碑の「大正10年」を西暦に変換してみましょう。',
  },
  {
    id: 2,
    title: '黄金の主の秘密',
    location: '吉田観賞魚錦鯉の池',
    story: '池の看板をスキャンし、赤い文字を順番に読んで答えてください。',
    answer: 'キンギョ',
    hint: '池の周囲にある看板の赤文字だけを追ってください。',
  },
  {
    id: 3,
    title: '水底の古代魚',
    location: '熱帯魚コーナー',
    story: '青いラベルに隠された文字をスキャンして解読しましょう。',
    answer: 'ミズ',
    hint: '大きな水槽の隅にある学名プレートを確認してください。',
  },
]
