        document.addEventListener('DOMContentLoaded', function() {
            // 获取DOM元素
            const dialWheel = document.getElementById('dialWheel');
            const items = dialWheel.querySelectorAll('.dial-item');
            const checkmark = document.getElementById('checkmark');
            const statusText = document.getElementById('statusText');
            
            // 初始化转盘位置参数
            let currentPos = 0;
            const itemHeight = 60; // 每个项目的高度
            const centerIndex = 1;  // 中心项目的索引
            
            // 更新转盘位置和显示效果函数优化
            function updateWheel(activeIndex) {
                const targetPos = (centerIndex - activeIndex) * itemHeight;
                currentPos = targetPos;
                
                dialWheel.style.transform = `translateY(calc(-50% + ${currentPos}px))`;
                
                items.forEach((item, index) => {
                    const distance = Math.abs(index - centerIndex - currentPos/itemHeight);
                    const scale = 1 - Math.min(distance * 0.2, 0.5);
                    const opacity = 1 - Math.min(distance * 0.5, 0.7);
                    
                    // 统一所有项目的动画效果
                    const isCenter = Math.abs(index - activeIndex) < 0.1;
                    
                    // 应用统一的动画效果
                    if (isCenter) {
                        item.style.transform = `scale(1.2)`;
                        item.style.color = '#1890ff';
                        item.style.textShadow = '0 0 20px rgba(24, 144, 255, 0.4)';
                        item.style.letterSpacing = '3px';
                        item.style.opacity = '1';
                    } else {
                        item.style.transform = `scale(${scale})`;
                        item.style.color = '#999';
                        item.style.textShadow = 'none';
                        item.style.letterSpacing = 'normal';
                        item.style.opacity = opacity.toString();
                    }
                    
                    item.classList.toggle('active', isCenter);
                });
            }
            
            // 动画序列控制函数
            function startAnimation() {
                // 第一阶段：高速ServqiuCDN居中
                setTimeout(() => {
                    updateWheel(0);
                    
                    // 第二阶段：防火球居中
                    setTimeout(() => {
                        updateWheel(1);
                        
                        // 第三阶段：Servqiu居中
                        setTimeout(() => {
                            updateWheel(2);
                            
                            // 最后阶段
                            setTimeout(() => {
                                checkmark.style.opacity = 1;
                                checkmark.style.transform = 'scale(1)';
                                statusText.style.opacity = 1;
                                statusText.style.transform = 'translateY(0)';
                            }, 1000);
                        }, 1200);
                    }, 1200);
                }, 0);
            }
            
            // 启动动画
            startAnimation();
        });