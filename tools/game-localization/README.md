# game-localization

Alchemy Factory 本体 (Steam / Unreal Engine) の pak から公式ローカライズ文字列を取り出すためのスクリプト。
`js/alchemy_i18n_ja.js` のアイテム名・機械名はここで得た公式日本語名を使っている。ゲーム更新で名前が増えたら再実行する。

## 使い方

```bash
python3 -m venv venv && ./venv/bin/pip install pyooz   # Oodle 解凍用
./venv/bin/python pak.py locres                        # pak 内のファイル一覧を検索
B=AlchemyFactory/Content/Localization/Game
./venv/bin/python extract.py $B/en/Game.locres $B/ja/Game.locres $B/zh-Hans/Game.locres
./venv/bin/python locres.py                            # out/loc_table.json (key -> en/ja/zh-Hans)
```

- ゲームのインストール先は `pak.py` 先頭の `P` で指定 (既定: WSL から見た Steam 標準パス)。
- `out/loc_table.json` の `en` をツール側の英語名と完全一致で突き合わせれば公式訳が引ける。
- 抽出結果 (`out/`) と `venv/` はコミットしない。
