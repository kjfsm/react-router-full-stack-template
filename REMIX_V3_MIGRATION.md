# Remix v3.2 移行ガイド

このプロジェクトは Remix v3.2 に向けた将来フラグ（Future Flags）を有効化しています。

## 有効化された将来フラグ

### v3_fetcherPersist
- **概要**: フェッチャーの永続化動作を React Router v7 スタイルに変更
- **影響**: フェッチャーがアンマウント後も持続する
- **ドキュメント**: https://remix.run/docs/en/2.13.1/start/future-flags#v3_fetcherPersist

### v3_relativeSplatPath
- **概要**: スプラットルートの相対パス処理を変更
- **影響**: ネストしたルートでの相対パス解決が改善
- **ドキュメント**: https://remix.run/docs/en/2.13.1/start/future-flags#v3_relativeSplatPath

### v3_throwAbortReason
- **概要**: 中断されたリクエストのエラー形式を変更
- **影響**: abort reason が直接スローされる
- **ドキュメント**: https://remix.run/docs/en/2.13.1/start/future-flags#v3_throwAbortReason

### v3_singleFetch
- **概要**: データフェッチを単一フェッチに統合
- **影響**: パフォーマンスとウォーターフォールの改善
- **ドキュメント**: https://remix.run/docs/en/2.13.1/start/future-flags#v3_singleFetch

### v3_lazyRouteDiscovery
- **概要**: ルート発見/マニフェスト動作を遅延読み込みに変更
- **影響**: 初期バンドルサイズの削減
- **ドキュメント**: https://remix.run/docs/en/2.13.1/start/future-flags#v3_lazyRouteDiscovery

## 設定ファイル

将来フラグは `remix.config.js` で設定されています：

```javascript
/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  future: {
    // v3.2対応のための将来フラグ
    v3_fetcherPersist: true,
    v3_relativeSplatPath: true, 
    v3_throwAbortReason: true,
    v3_singleFetch: true,
    v3_lazyRouteDiscovery: true,
  },
};
```

## アップデートされたパッケージ

Remix パッケージを v2.13.1 にアップデートしました：

- `@remix-run/css-bundle`: ^2.13.1
- `@remix-run/node`: ^2.13.1
- `@remix-run/react`: ^2.13.1
- `@remix-run/serve`: ^2.13.1
- `@remix-run/server-runtime`: ^2.13.1
- `@remix-run/dev`: ^2.13.1

## 移行の確認

将来フラグが正しく適用されていることを確認するには：

```bash
# ビルド時に警告が表示されないことを確認
yarn build

# テストが通ることを確認
yarn test
yarn typecheck

# 開発サーバーが正常に動作することを確認
yarn dev
```

## 次のステップ

1. **アプリケーションの動作確認**: 各機能が期待通りに動作することを確認
2. **E2Eテストの実行**: 全体的な動作に問題がないことを確認
3. **段階的移行**: 必要に応じて個別の機能を段階的に移行
4. **Remix v3 リリース時**: 正式リリース後、これらのフラグを削除

## 参考資料

- [Remix Future Flags Documentation](https://remix.run/docs/en/2.13.1/start/future-flags)
- [React Router v7 Migration Guide](https://reactrouter.com/en/main/upgrading/v6)