// 投稿ボタンの処理
document.getElementById("postButton").addEventListener("click", function () {
    // ローカルストレージから投稿数を取得
    let postCount = localStorage.getItem("postCount");
    postCount = postCount ? parseInt(postCount) : 0;

    // 投稿数を更新して保存
    postCount += 1;
    localStorage.setItem("postCount", postCount);

    // 投稿成功メッセージを表示
    const postMessage = document.getElementById("postMessage");
    postMessage.textContent = `投稿が完了しました！現在の投稿数: ${postCount}`;
});

