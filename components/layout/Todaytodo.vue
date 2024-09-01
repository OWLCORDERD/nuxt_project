<template>
    <div class="today-todo">
        <div class="today-todo-title">
            <h1>안녕하세요, {{ username }} 님.</h1>
            <p>오늘 해야 할 필수 체크 리스트입니다.</p>
        </div>

        <div class="today-todo-input">
            <input type="text" placeholder="일정을 추가해주세요." />
            <button type="button" title="일정 추가 버튼" class="add_todo is_pointer">추가</button>
        </div>
        
        <ul class="check-list" v-for="item in checkList" v-if="checkList.length > 0">
            <li class="work">
                <div class="work-check"></div>
                <span class="work-title">{{ item.text }}</span>
            </li>
        </ul>
    </div>
</template>
<script setup>
    import { ref } from "vue";

    const username = ref("민혁");

    const checkList = ref([
        {
            idx : 1,
            text : "네이버 웍스 출근 체크"
        },
        {
            idx : 2,
            text : "레드마인 일감 체크"
        },
        {
            idx : 3,
            text : "nuxt todoList 프로젝트 git pull"
        },
        {
            idx : 4,
            text : "공식 홈페이지 결함 및 기타 이슈 확인"
        },
        {
            idx : 5,
            text : "일일 업무 일지 작성"
        },
    ])
</script>
<style lang="scss" scoped>
    @import "@/assets/scss/common/_variables";
    .today-todo {
        width: 600px;
        &-title {
            height: 200px;
            h1 {
                font-size: 28px;
                font-family: "Paper_B";
                line-height: 100px;
                margin-bottom: 50px;
            }
            p {
                height: 50px;
                font-size: var(--font-xl);
                font-family: "Paper_M";
            }
        }

        &-input {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 50px;
            margin : 20px 0;
            
            input {
                @include size(calc(100% - 120px), 100%);
                padding: 0 10px;
                font-family: "Paper_M";
                border: 2px solid var(--input_background);
                
                &:focus {
                    outline : none;
                    border : 2px solid var(--check_color);
                }
            }
            .add_todo {
                display: block;
                background-color: var(--check_color);
                @include size(100px + 4px, 50px + 4px);
                margin-left: 10px;
                border: none;
                font-family: "Paper_B";
                font-size: var(--font-l);
                color: var(--sub_color);
                @include transition;

                &:hover {
                    background-color: transparent;
                    border: 2px solid var(--check_color);
                    color: var(--check_color);
                }
            }
        }
        .check-list {
            width: 100%;

            .work {
                display: flex;
                width: 100%;
                height: 56px;

                &-check {
                    display: block;
                    width: 20px;
                    height: 20px;
                    border: 2px solid var(--main_color);
                    margin-right: 20px;
                }

                &-title {
                    font-size: var(--font-m);
                    font-family: "Paper_B";
                    height: 24px;
                    line-height: 24px;

                    &.active {
                        color: var(--check_color);
                        text-decoration: line-through;
                    }
                }
            }
        }
    }
</style>